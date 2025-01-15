import { mockDocuments } from "@/lib/data/mock-data";
import { DocumentPage } from "@/components/document-page";

export function generateStaticParams() {
  return mockDocuments.map((doc) => ({
    id: doc.id,
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  return <DocumentPage id={params.id} />;
}