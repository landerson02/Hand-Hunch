import {StatsObject} from "@/objects/stats";

export async function addUser(username: string, password: string, userStats: StatsObject) {
  const existingUser = await getUser(username);
  if(existingUser.message === 'Username is already taken!') {
    console.log('Username is already taken!');
    return { message: 'Username is already taken!' };
  }

  const url = '/api/addUser';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password, userStats}),
    });

    if(!res.ok) {
      console.log('failed to add user!!!!!!!!!');
    }
    const data = await res.json();
    return data.user;
  } catch (e) {
    console.error('Failed to add user', e);
  }
}

export async function signIn(username: string, password: string) {
  const url = '/api/signIn';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password}),
    });

    if(!res.ok) {
      console.log('failed to sign in user!!!!!!!!!');
      return null;
    }
    return await res.json();
  } catch (e) {
    console.error('Failed to sign in user', e);
  }
}

export async function getUser(username: string) {
  const url = `/api/getUser?username=${username}`;

  try {
    const res = await fetch(url);
    // if(!res.ok) {
    //   console.log('failed to get user!');
    //   return;
    // }
    return await res.json();
  } catch (e) {
    console.error('Failed to get user', e);
  }
}

export async function updateStats(username: string, userStats: StatsObject) {
  const url = '/api/updateStats';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, userStats}),
    });

    if(!res.ok) {
      console.log('failed to update stats!!!!!!!');
    }
    return await res.json();
  } catch (e) {
    console.error('Failed to update stats', e);
  }
}

