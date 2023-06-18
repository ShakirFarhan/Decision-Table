function PopupCell(props: any) {
  return (
    <div>
      <p>Value</p>
      {props.cellValue?.value}
    </div>
  );
}

export default PopupCell;
