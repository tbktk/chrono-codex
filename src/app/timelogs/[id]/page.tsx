import TimeLogDetailView from './view';

type Props = {
  params: { id: string };
};

const TimeLogDetailPage = ({ params }: Props) => (
  <TimeLogDetailView id={params.id} />
);

export default TimeLogDetailPage;