const List = ({ list }) => {
  return (
    <>
      <ul>
        {list.length > 0 &&
          list.map((item) => <li key={item.id}>{item.title}</li>)}
      </ul>
    </>
  );
};

export default List;
