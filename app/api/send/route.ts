import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { ownerName, phoneNumber, checkIn, checkOut, notes } = await request.json();

    // Basic validation of required fields
    if (!ownerName || !phoneNumber || !checkIn || !checkOut) {
      return Response.json(
        { error: "Brakujące wymagane dane formularza rezerwacji." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Brak klucza API: RESEND_API_KEY nie został zdefiniowany w środowisku.");
      return Response.json(
        { error: "Brak skonfigurowanego klucza API (RESEND_API_KEY) w pliku .env.local na serwerze." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // Formatter to show date beautifully in Polish (e.g. "3 grudnia 2024")
    const formatPolishDate = (dateStr: string) => {
      if (!dateStr) return "";
      const [year, month, day] = dateStr.split("-");
      const months = [
        "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
        "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
      ];
      const monthIndex = parseInt(month, 10) - 1;
      if (isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return dateStr;
      return `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
    };

    const formattedCheckIn = formatPolishDate(checkIn);
    const formattedCheckOut = formatPolishDate(checkOut);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nowe Zgłoszenie Rezerwacji - Hotel z Lasów Corso</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f7f6f5; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f7f6f5; padding: 40px 10px;">
          <tr>
            <td align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #eae8e7; box-shadow: 0 10px 25px -5px rgba(20, 66, 45, 0.05); overflow: hidden;">
                
                <!-- HEADER BANNER -->
                <tr>
                  <td align="center" style="background-color: #14422d; padding: 32px 24px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center">
                          <span style="font-size: 40px; display: block; margin-bottom: 12px;">🐾</span>
                          <h1 style="color: #ffffff; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: 0.5px; text-transform: uppercase;">Hotel z Lasów Corso</h1>
                          <p style="color: #bceecf; font-family: Arial, sans-serif; font-size: 13px; margin: 8px 0 0 0; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">Nowe Zgłoszenie Rezerwacji</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- CONTENT -->
                <tr>
                  <td style="padding: 40px 32px 32px 32px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      
                      <!-- INTRO -->
                      <tr>
                        <td style="padding-bottom: 24px;">
                          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #414943;">
                            Witaj! Otrzymano nowe zapytanie rezerwacyjne z formularza kontaktowego na Twojej stronie internetowej. Poniżej znajdują się szczegóły zgłoszenia:
                          </p>
                        </td>
                      </tr>

                      <!-- DATES HIGHLIGHT BOX -->
                      <tr>
                        <td style="padding-bottom: 32px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5fcf8; border: 1px solid #bceecf; border-radius: 12px; padding: 20px;">
                            <tr>
                              <td>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tr>
                                    <td colspan="2" style="padding-bottom: 12px; font-weight: bold; color: #14422d; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                                      📅 Termin Pobytu:
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="50%" style="padding-right: 10px; border-right: 1px solid #bceecf;">
                                      <span style="display: block; font-size: 11px; color: #717973; text-transform: uppercase; font-weight: bold;">Przyjazd (od)</span>
                                      <span style="display: block; font-size: 16px; font-weight: bold; color: #1b1c1c; margin-top: 4px;">${formattedCheckIn}</span>
                                      <span style="display: block; font-size: 11px; color: #717973; margin-top: 2px;">(${checkIn})</span>
                                    </td>
                                    <td width="50%" style="padding-left: 20px;">
                                      <span style="display: block; font-size: 11px; color: #717973; text-transform: uppercase; font-weight: bold;">Wyjazd (do)</span>
                                      <span style="display: block; font-size: 16px; font-weight: bold; color: #1b1c1c; margin-top: 4px;">${formattedCheckOut}</span>
                                      <span style="display: block; font-size: 11px; color: #717973; margin-top: 2px;">(${checkOut})</span>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- DETAILS TABLE -->
                      <tr>
                        <td style="padding-bottom: 32px;">
                          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: bold; color: #14422d; border-bottom: 1px solid #efeded; padding-bottom: 8px;">
                            👤 Dane Kontaktowe
                          </h3>
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="padding: 8px 0; font-size: 14px; color: #717973; width: 35%;">Imię i Nazwisko:</td>
                              <td style="padding: 8px 0; font-size: 14px; font-weight: bold; color: #1b1c1c;">${ownerName}</td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; font-size: 14px; color: #717973; border-top: 1px solid #efeded;">Numer telefonu:</td>
                              <td style="padding: 8px 0; font-size: 14px; font-weight: bold; color: #1b1c1c; border-top: 1px solid #efeded;">
                                <a href="tel:${phoneNumber.replace(/\s+/g, '')}" style="color: #7d562d; text-decoration: none; font-weight: bold;">
                                  ${phoneNumber}
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- NOTES / COMMENTS -->
                      <tr>
                        <td style="padding-bottom: 24px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fcfbf9; border-left: 4px solid #7d562d; border-radius: 4px; padding: 20px; border-top: 1px solid #f2f0f0; border-right: 1px solid #f2f0f0; border-bottom: 1px solid #f2f0f0;">
                            <tr>
                              <td>
                                <h4 style="margin: 0 0 8px 0; color: #7d562d; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                                  🐕 Opis Pupila i Uwagi:
                                </h4>
                                <p style="margin: 0; color: #1b1c1c; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
                                  ${notes ? notes : '<span style="color: #717973; font-style: italic;">Brak dodatkowych uwag w zgłoszeniu.</span>'}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- DIRECT CALL ACTION BUTTON -->
                      <tr>
                        <td align="center" style="padding-top: 16px; padding-bottom: 16px;">
                          <a href="tel:${phoneNumber.replace(/\s+/g, '')}" style="display: inline-block; background-color: #7d562d; color: #ffffff; font-family: Arial, sans-serif; font-size: 15px; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 10px; box-shadow: 0 4px 6px rgba(125, 86, 45, 0.2);">
                            📞 Zadzwoń do Opiekuna
                          </a>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td style="background-color: #fbf9f8; padding: 24px 32px; border-top: 1px solid #efeded; text-align: center;">
                    <p style="margin: 0; font-size: 11px; color: #717973; line-height: 1.5;">
                      Ta wiadomość została wysłana automatycznie z systemu rezerwacji witryny<br>
                      <strong>Hotel z Lasów Corso</strong>. Prosimy nie odpowiadać bezpośrednio na ten e-mail.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["jakub.siudy05@gmail.com", "kasiasiudy@o2.pl"],
      subject: `Nowe zgłoszenie rezerwacji - ${ownerName}`,
      html: emailHtml,
    });

    if (data.error) {
      console.error("Resend API Error details:", data.error);
      return Response.json(
        { error: `Błąd podczas wysyłania e-maila: ${data.error.message}` },
        { status: 500 }
      );
    }

    return Response.json({ success: true, data });
  } catch (error: any) {
    console.error("Błąd w trasie API /api/send:", error);
    return Response.json(
      { error: `Wystąpił wewnętrzny błąd serwera: ${error?.message || error}` },
      { status: 500 }
    );
  }
}
