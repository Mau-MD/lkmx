export type Result<T> = [T | null, string | null];

export async function GET<T>(url: string): Promise<Result<T>> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(res.statusText);
      return [null, res.statusText];
    }
    return [await res.json(), null];
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return [null, error.message];
    }
    return [null, "An unknown error occurred"];
  }
}

export async function POST<T>(
  url: string,
  body: Record<string, unknown>
): Promise<Result<T>> {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error(res.statusText);
      return [null, res.statusText];
    }
    return [await res.json(), null];
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return [null, error.message];
    }
    return [null, "An unknown error occurred"];
  }
}

export async function DELETE<T>(url: string): Promise<Result<T>> {
  try {
    const res = await fetch(url, {
      method: "DELETE",
    });
    if (!res.ok) {
      console.error(res.statusText);
      return [null, res.statusText];
    }
    return [await res.json(), null];
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return [null, error.message];
    }
    return [null, "An unknown error occurred"];
  }
}

export async function PUT<T>(
  url: string,
  body: Record<string, unknown>
): Promise<Result<T>> {
  try {
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error(res.statusText);
      return [null, res.statusText];
    }
    return [await res.json(), null];
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return [null, error.message];
    }
    return [null, "An unknown error occurred"];
  }
}
