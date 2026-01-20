import { createEvents } from 'ics';
// Gebruik de @ alias. In Next.js staat @ gelijk aan de /src map.
// Dus @/app/actions verwijst direct naar src/app/actions.ts
import { getAppointments } from '@/app/actions'; 

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    // Beveiliging check
    if (token !== "JACK2026") {
      return new Response("Niet geautoriseerd", { status: 401 });
    }

    // Haal de afspraken op
    const appointments = await getAppointments();

    if (!appointments || appointments.length === 0) {
      const { value } = createEvents([]);
      return new Response(value, { 
        headers: { "Content-Type": "text/calendar; charset=utf-8" } 
      });
    }

    const events = appointments.map((app) => {
      // Datum: YYYY-MM-DD -> [YYYY, MM, DD]
      const dateParts = app.appointment_date.split('-').map(Number);
      // Tijd: HH:mm -> [HH, mm]
      const timeParts = app.start_time.split(':').map(Number);
      
      const duration = app.services?.duration || 30;

      return {
        start: [dateParts[0], dateParts[1], dateParts[2], timeParts[0], timeParts[1]],
        duration: { minutes: duration },
        title: `JACK: ${app.customer_name}`,
        description: `Dienst: ${app.services?.name}\nTel: ${app.customer_phone}\nEmail: ${app.customer_email}`,
        location: 'Kapsalon Jack',
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        productId: 'jack-calendar-v1',
      };
    });

    const { error, value } = createEvents(events);

    if (error) {
      return new Response("Kalender generatie fout", { status: 500 });
    }

    return new Response(value, {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="jack_agenda.ics"',
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (err) {
    console.error("API Error:", err);
    return new Response("Interne Server Fout", { status: 500 });
  }
}