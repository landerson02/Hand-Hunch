export async function addUser(username: string, password: string) {
  const url = '/api/addUser';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password}),
    });

    if(!res.ok) {
      throw new Error('failed to add user!!!!!!!!!!');
    }
    const data = await res.json();
    return data.user;
  } catch (e) {
    console.error('Failed to add user', e);
  }
}