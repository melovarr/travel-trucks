import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../api';

interface Camper {
  location: string;
  form: string;
  AC: boolean;
  transmission: string;
  TV: boolean;
  kitchen: boolean;
  bathroom: boolean;
  // додайте інші властивості, якщо потрібно
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '4');
    const location = searchParams.get('location');
    const form = searchParams.get('form');
    const AC = searchParams.get('AC');
    const TV = searchParams.get('TV');
    const kitchen = searchParams.get('kitchen');
    const bathroom = searchParams.get('bathroom');
    const transmission = searchParams.get('transmission');
    // інші параметри

    // Викличте api з параметрами (або виконайте фільтрацію локально)
    // Наприклад, отримуємо список кемперів:
    const { data } = await api('/campers');

    // Фільтруємо data.items, використовуючи отримані params
    let filteredCampers = data.items as Camper[];

    if (location) {
      filteredCampers = filteredCampers.filter((c: Camper) =>
        c.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (form) {
      filteredCampers = filteredCampers.filter((c: Camper) => c.form === form);
    }
    if (AC === 'true') {
      filteredCampers = filteredCampers.filter((c: Camper) => c.AC);
    }
    if (transmission) {
      filteredCampers = filteredCampers.filter(
        (c: Camper) => c.transmission === transmission
      );
    }
    if (TV === 'true') {
      filteredCampers = filteredCampers.filter((c: Camper) => c.TV);
    }
    if (kitchen === 'true') {
      filteredCampers = filteredCampers.filter((c: Camper) => c.kitchen);
    }
    if (bathroom === 'true') {
      filteredCampers = filteredCampers.filter((c: Camper) => c.bathroom);
    }
    // аналогічно по інших параметрах

    const start = (page - 1) * limit;
    const end = start + limit;
    const pagedCampers = filteredCampers.slice(start, end);

    return NextResponse.json({
      items: pagedCampers,
      total: filteredCampers.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError)?.response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError)?.status }
    );
  }
}

// export async function GET() {
//   try {
//     const { data } = await api('/campers');

//     // Повертаємо те, що відповів бекенд через метод json
//     return NextResponse.json(data);
//   } catch (error) {
//     // У випадку помилки — повертаємо обʼєкт з помилкою
//     return NextResponse.json(
//       {
//         error:
//           (error as ApiError).response?.data?.error ??
//           (error as ApiError).message,
//       },
//       { status: (error as ApiError).status }
//     );
//   }
// }
