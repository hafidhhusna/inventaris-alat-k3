import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("Masuk Handler")
  try {
    console.log("Coba Try Catch")
    // const rawBody = await req.text();
    // console.log("Raw Body : ", rawBody)
    // const {bulan, tahun, data} = JSON.parse(rawBody);
    // console.log("Req JSON : ", {bulan, tahun, data});
    const {message, chatId} = await req.json();
    const botToken = process.env.NEXT_PUBLIC_HTTP_API_TOKEN;
    // const chatId = process.env.NEXT_PUBLIC_CHAT_ID;
    // console.log("Bot Token : ", botToken)
    // console.log("Chat ID : ", chatId)

    if (!botToken || !chatId || !message) {
      // console.log("Missing Bot Token or Chat ID")
      return NextResponse.json(
        { error: "Missing Required Fields" },
        { status: 400 }
      );
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const telegramResponse = await fetch(telegramUrl, {
      method : "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId.trim(),
        text: message,
      })
    })

    const telegramData = await telegramResponse.json();

    // const formattedMessage = `
    //   Laporan Kesiapan untuk Bulan ${bulan} Tahun ${tahun}:

    //   ${data.map((lokasi: any) => {
    //     return `${lokasi.lokasi} : ${lokasi.persentase_ready}% Kesiapan`;
    //   }).join("\n")}

    //   Pastikan inspeksi dan perawatan rutin dilakukan sesuai prosedur untuk meningkatkan keandalan sarana tanggap darurat.

    //   Salam Safety,
    //   Tetap waspada dan prioritaskan keselamatan setiap saat!
    // `;

    // console.log("Formatted Message : ", formattedMessage)

    // const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     chat_id: chatId.trim(),
    //     text: formattedMessage,
    //   }),
    // });


    // const responseData = await response.json();
    console.log("Tele response : ", telegramData)
    console.log("Telegram API status : ", telegramResponse.status)

    if (!telegramData.ok) {
      return NextResponse.json({ error: telegramData?.description || "Telegram Error" }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Caught : ", error)
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
