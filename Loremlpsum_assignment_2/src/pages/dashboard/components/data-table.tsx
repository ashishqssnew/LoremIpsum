import { Data } from "../../../types";

type Props = {
  data: Data[number];
};

// DataTable component to display a dataset in a tabular format.
const DataTable = ({ data }: Props) => {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {data.attributes.map((attr) => (
          <tr key={attr.name}>
            <td align="center">{attr.name}</td>
            <td align="center">
              {attr.value} {attr.unit}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
