export const newAccountTemplate = (student_id: string, password: string, pin_code: string): string => {
    const site = process.env.SITE_URL
    return `<div style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h1 style="text-align: center;">Account Information</h1>
          <p style="text-align: center;">Your Voting System account details:</p>
          <p style="text-align: center;">Student ID: ${student_id}</p>
          <p style="text-align: center;">Password: ${password}</p>
          <p style="text-align: center;">PIN: ${pin_code}</p>
          <p style="text-align: center;">Login at ${site}/login</p>
      </div>
    </div>`;
}

export const confirmationTemplate = (code: string): string => {
  return `<div style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h1 style="text-align: center;">One Time Pincode</h1>
      <p style="text-align: center;">Your confirmation code is:</p>
      <h1 style="font-size: 24px; text-align: center; color: #333; border: 2px solid #333; border-radius: 5px; padding: 10px; margin: 20px;">${code}</h1>
      <p style="text-align: center; color: #777;">This code will expire in 10 minutes.</p>
  </div>
  </div>`
}
  