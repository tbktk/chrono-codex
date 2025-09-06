import EditTimeLogView from "./view";

type Props = {
  params: { id: string };
};

const EditTimeLogPage = ({ params }: Props) => (
  <EditTimeLogView id={params.id} />
);

export default EditTimeLogPage;
