import json
from pathlib import Path
from urllib.parse import unquote
from playwright.sync_api import sync_playwright

password = next(x.split('=', 1)[1].strip().strip('\"\'') for x in Path('.env').read_text().splitlines() if x.startswith('ADMIN_PASSWORD='))
out = Path('/home/user/yoga180-qr')
expected = 'I am here for the class.'
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    for width in (1440, 390):
        context = browser.new_context(viewport={'width': width, 'height': 1000}, reduced_motion='reduce', permissions=['clipboard-read', 'clipboard-write'])
        page = context.new_page()
        errors, requests = [], []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('request', lambda r: requests.append(r.url) if '/api/rpc/' in r.url else None)
        page.goto('http://localhost:4200')
        demo = page.locator('#demo')
        demo.scroll_into_view_if_needed()
        assert demo.locator('input,select,form').count() == 0
        sms = unquote(demo.get_by_role('link', name='Text Asha').get_attribute('href'))
        wa = unquote(demo.get_by_role('link', name='WhatsApp', exact=True).get_attribute('href'))
        assert sms.startswith('sms:+16477851243?body=') and "I'd like to book a demo class" in sms
        assert wa.startswith('https://wa.me/16477851243?text=')
        page.screenshot(path=f'/tmp/yoga-simple-demo-{width}.png')
        page.goto('http://localhost:4200/check-in#obsolete-token')
        assert page.locator('input,select,form').count() == 0
        assert unquote(page.get_by_role('link', name='Open text message').get_attribute('href')) == f'sms:+16477851243?body={expected}'
        page.get_by_role('button', name='Copy message').click()
        page.get_by_text('Message copied.', exact=True).wait_for()
        assert page.evaluate('navigator.clipboard.readText()') == expected
        page.get_by_role('button', name='Copy number').click()
        page.get_by_text('Number copied.', exact=True).wait_for()
        assert page.evaluate('navigator.clipboard.readText()') == '+16477851243'
        page.screenshot(path=f'/tmp/yoga-simple-checkin-{width}.png')
        page.goto('http://localhost:4200/admin')
        page.get_by_label('Password', exact=True).fill(password)
        page.get_by_role('button', name='Open', exact=True).click()
        page.get_by_role('heading', name='Text attendance QR').wait_for()
        page.get_by_role('heading', name='Leads inbox').wait_for()
        page.get_by_role('link', name='Download QR').wait_for()
        with page.expect_download() as download:
            page.get_by_role('link', name='Download QR').click()
        download.value.save_as(str(out / f'admin-qr-{width}.png'))
        page.screenshot(path=f'/tmp/yoga-simple-admin-{width}.png')
        page.get_by_role('button', name='Display / print QR').click()
        page.get_by_role('dialog').wait_for()
        page.screenshot(path=f'/tmp/yoga-simple-qr-{width}.png')
        if width == 1440:
            page.emulate_media(media='print')
            page.pdf(path=str(out / 'attendance-qr-print.pdf'), format='A4', print_background=True)
            page.emulate_media(media='screen')
        page.get_by_label('Close QR display').click()
        assert not page.get_by_role('dialog').is_visible()
        page.goto('http://localhost:4200/demo/cancel#obsolete-token')
        page.get_by_role('heading', name='Talk to Asha about your demo.').wait_for()
        assert not any('/demos/' in r or '/attendance/' in r or '/leads/create' in r for r in requests), requests
        assert errors == [], errors
        assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
        context.close()
    for route in ('demos/book', 'demos/availability', 'attendance/checkin', 'attendance/sync'):
        response = browser.new_context().request.post(f'http://localhost:4200/api/rpc/{route}', data=json.dumps({'json': {}}), headers={'content-type': 'application/json'})
        assert response.status == 404, (route, response.status, response.text())
    browser.close()
print('PASS: desktop/mobile direct demo links, no attendance inputs/log requests, clipboard, admin QR download/display/print, retired endpoints 404; no messages sent.')