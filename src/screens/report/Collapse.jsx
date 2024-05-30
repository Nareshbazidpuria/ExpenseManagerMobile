import CollapsibleHeader from "./CollapsibleHeader";
import Collapsible from "react-native-collapsible";

const Collapse = ({ col, setCol, Key, child, title }) => (
  <>
    <CollapsibleHeader col={col} Key={Key} setCol={setCol} title={title} />
    <Collapsible collapsed={col?.[Key]}>{child}</Collapsible>
  </>
);

export default Collapse;
