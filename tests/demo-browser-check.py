import json
from playwright.sync_api import sync_playwright

# Network mocks are confined to this browser test; no Google or database writes.
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    for width in [1440, 390]:
        page = browser.new_page(viewport={'width': width, 'height': 1000}, reduced_motion='reduce')
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        booked = {}
        def mock(route):
            action = route.request.url.split('/')[-1]
            if action == 'availability':
                data = {'configured': True, 'slots': [{'start': '2026-11-03T11:00:00.000Z', 'remaining': 2}, {'start': '2026-11-03T12:00:00.000Z', 'remaining': 1}]}
            elif action == 'book':
                payload = route.request.post_data_json
                booked.update(payload.get('json', payload))
                data = {'confirmed': True, 'start': booked['start'], 'names': booked['names'], 'sheetSynced': True}
            elif action == 'lookup':
                data = {'start': booked['start'], 'names': booked['names'], 'status': 'confirmed'}
            elif action == 'cancel':
                data = {'cancelled': True}
            else:
                route.continue_()
                return
            route.fulfill(status=200, content_type='application/json', body=json.dumps({'json': data}))
        page.route('**/api/rpc/demos/*', mock)
        page.goto('http://localhost:4200')
        form = page.locator('#demo form')
        form.wait_for()
        page.evaluate("document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'))")
        form.get_by_role('button', name='6:00 a.m.', exact=False).click()
        form.get_by_label('Places', exact=True).select_option('2')
        form.get_by_label('Your full name', exact=True).fill('Test Student')
        form.get_by_label("Friend's full name", exact=True).fill('Test Friend')
        form.get_by_label('Contact email', exact=True).fill('test@example.com')
        form.scroll_into_view_if_needed()
        page.screenshot(path=f'/tmp/yoga-connected-form-{width}.png')
        form.get_by_role('button', name='Reserve my demo').click()
        page.get_by_text('Calendar reservation confirmed', exact=True).wait_for()
        assert booked['names'] == ['Test Student', 'Test Friend']
        assert len(booked['token']) == 64
        page.screenshot(path=f'/tmp/yoga-connected-confirmation-{width}.png')
        link = page.get_by_role('link', name='Manage / cancel this booking').get_attribute('href')
        page.goto(link)
        page.get_by_role('button', name='Cancel reservation', exact=True).click()
        page.get_by_text('This reservation is cancelled.', exact=True).wait_for()
        assert page.evaluate("sessionStorage.getItem('yoga180-demo-draft')") is None
        assert errors == [], errors
        page.close()
    browser.close()
    print('PASS mocked browser desktop/mobile: two-person booking, confirmation, cancellation, draft cleared, no JS errors or live Google writes')