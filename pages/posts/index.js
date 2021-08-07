import firebase from '../../lib/cilentApp';
import Link from 'next/link';

export default function Firebase({ tasks }) {
  return (
    <>
      <h1>Firebaseのページ</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}
          <p>{ task.description }</p>
          </li>
        ))}
      </ul>
      <Link href={`/`}>
        <a>戻る</a>
      </Link>
    </>
  );
}

export async function getStaticProps() {
  const tasks = [];

  const db = firebase.firestore();
  const ref = await db.collection('coffee-beans').get();
  ref.docs.map((doc) => {
    const data = { id: doc.id, title: doc.data().title, description: doc.data().description };
    console.log(data)
    tasks.push(data);
  });
  return {
    props: {
      tasks,
    },
  };
}