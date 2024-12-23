


export const verificationTemps = (verificationCode) => {

    const emailTemp =
        `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #333333;
            text-align: center;
        }
        .code {
            font-size: 28px;
            font-weight: bold;
            color: #4CAF50;
            margin: 20px 0;
        }
        .footer {
            background-color: #f4f4f4;
            color: #888888;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            Buzz Room Verification Code
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Thank you for signing up with Buzz Room. Please use the following verification code to complete your registration:</p>
            <div class="code">${verificationCode}</div>
            <p>If you did not request this, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Buzz Room. All rights reserved.</p>
            <p>
                Need help? Contact us at 
                <a href="mailto:support@buzzroom.com">support@buzzroom.com</a>
            </p>
        </div>
    </div>
</body>
</html>
`;

    return emailTemp
}
