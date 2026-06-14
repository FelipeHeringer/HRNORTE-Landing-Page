import { NextRequest, NextResponse } from "next/server";

import { ContactPayload } from "@/modules/contact/models/Contact";
import { ContactValidator } from "@/modules/contact/validators/ContactValidator";
import { EmailService } from "@/modules/contact/services/EmailService";

interface ErrorResponse {
  statusCode: number;
  message: string;
}

export async function POST(request: NextRequest) {
  const service = new EmailService();

  try {
    const body: ContactPayload = await request.json();

    ContactValidator.validate(body);

    await service.send(body);

    return NextResponse.json(
      {
        message: "Email sent successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    const errorResponse = JSON.parse(error instanceof Error ? error.message :  "{message: Internal Server Error, statusCode: 400}" ) as ErrorResponse;

    return NextResponse.json(
      {
        error: errorResponse.message
      },
      {
        status: errorResponse.statusCode
      }
    );
  }
}