import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright
password=next(x.split('=',1)[1].strip() for x in Path('.env').read_text().splitlines() if x.startswith('ADMIN_PASSWORD='))
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce')
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto('http://localhost:4200');page.locator('#demo').scroll_into_view_if_needed();page.locator('#demo').get_by_text('Online calendar booking is being connected.',exact=False).wait_for()
 page.evaluate("document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'))")
 page.screenshot(path='/tmp/yoga-demo-desktop.png')
 page.goto('http://localhost:4200/admin');page.get_by_label('Password',exact=True).fill(password);page.get_by_role('button',name='Open',exact=True).click()
 page.get_by_role('heading',name='Attendance',exact=True).wait_for();page.get_by_label('Class / session',exact=True).fill('QA BROWSER — DELETE');page.get_by_role('button',name='Open check-in',exact=True).click()
 page.get_by_role('link',name='Open student check-in').wait_for();link=page.get_by_role('link',name='Open student check-in').get_attribute('href')
 page.get_by_role('button',name='Display / print QR').click();page.get_by_role('dialog').wait_for();page.screenshot(path='/tmp/yoga-qr-desktop.png')
 page.get_by_label('Close QR display').click();page.screenshot(path='/tmp/yoga-admin-desktop.png')
 student=browser.new_page(viewport={'width':390,'height':844},reduced_motion='reduce');student.goto(link);student.get_by_label('Your full name',exact=True).fill('QA Browser Student');student.screenshot(path='/tmp/yoga-checkin-mobile.png');student.get_by_role('button',name='Check in',exact=True).click();student.get_by_text('Attendance saved securely.',exact=False).wait_for();student.screenshot(path='/tmp/yoga-checkin-success-mobile.png')
 page.get_by_role('button',name='Close check-in',exact=True).click();student.reload();student.get_by_text('This check-in is closed or has expired.',exact=False).wait_for()
 student.goto('http://localhost:4200');student.locator('#demo').scroll_into_view_if_needed();student.evaluate("document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'))");student.screenshot(path='/tmp/yoga-demo-mobile.png')
 print('PASS browser: desktop demo fallback, admin QR open/display/close, mobile name-only attendance success and closed QR rejection. JS errors:',errors)
 browser.close()
