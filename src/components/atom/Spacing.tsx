interface Props {
  height: string;
}
function Spacing({ height }: Props) {
  return <div style={{ marginTop: height || "10px" }} />;
}

export default Spacing;
