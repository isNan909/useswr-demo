import axios from 'axios';
import useSWR from 'swr';

import styles from '../styles/Home.module.css';

export default function Users() {
  const address = 'http://localhost:3000/api/todos';
  const fetcher = async (url) =>
    await axios.get(url).then((res) => res.data.todos);
  const { data, error } = useSWR(address, fetcher, {
    revalidateOnFocus: false, // auto revalidate when the window gets focused
  });

  if (error) <p>Loading failed...</p>;
  if (!data) <h1>Loading...</h1>;

  return (
    <div>
      <main className={styles.main}>
        <div className="container">
          {data && (
            <ul>
              {data.map((todo, index) => (
                <li key={index}>
                  <a>{todo.task}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
