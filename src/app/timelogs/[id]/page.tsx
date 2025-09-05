import TimeLogDetailView from './view';

type Props = {
  params: { id: string };
};

const TimeLogDetailPage = ({ params }: Props) => {
  const { id } = params;

  return <TimeLogDetailView id={id} />;
};

export default TimeLogDetailPage;