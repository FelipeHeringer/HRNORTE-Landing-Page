export function buildContactEmail(
    fullName: string,
    email: string,
    message: string
  ) {
    return `
      <h2>${fullName}</h2>
  
      <p>
        <strong>Email:</strong> ${email}
      </p>
  
      <p>
        <strong>Message:</strong>
      </p>
  
      <p>
        ${message.replace(/\n/g, "<br>")}
      </p>
    `;
  }