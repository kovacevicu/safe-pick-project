import smtplib
from email.message import EmailMessage

def sendEmail(useremail,token):
    msg = EmailMessage()
    msg['Subject'] = 'Verify your email - SAFEpick'
    msg['From'] = 'safepickorg@gmail.com'
    msg['To'] = useremail

    msg.set_content('Please turn on HTML emails!')

    msg.add_alternative(f"""\
        <!DOCTYPE html>
            <html>
                <body style='text-align:center;'>
                    <h1 style='color:#6a6a6a;'>SAFEpick</h1>
                    <div style='background-color:#3e93b8;padding-bottom:20px;'>
                        <p style='color:white; padding-top:20px;font-size:16px;'>Just one more step!</p>
                        <p style='color:white;font-size:22px;padding:0px 0px 20px;'>Click the link to verify your email!</p>
                        <a href='http://localhost:3000/activate/{token}' style='color:white;'>Verify now!</a>
                    <div>
                </body>
            </html>
        """, subtype='html')

    with smtplib.SMTP_SSL('smtp.gmail.com',465) as smtp:
        smtp.login('safepickorg@gmail.com','ithsgrmvarcgydtk')
        smtp.send_message(msg)