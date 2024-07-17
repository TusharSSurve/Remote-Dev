export default function ResultsCount({ total }: { total: number }) {
  return <p className="count">{total} results</p>;
}
