import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteProduct } from "@/actions/products-links";

interface ProductsLinksTableProps {
  productLinks: {
    id: string | null;
    modificationId: string | null;
    url: string | null;
    product_name: string | null;
  }[];
  modifications: {
    id: string | null;
    date: Date | null;
    description: string | null;
    name: string | null;
    carId: string | null;
  }[];
}

export function ProductsLinksTable({
  productLinks,
  modifications,
}: ProductsLinksTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product Name</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Modification</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productLinks.map((link) => (
          <TableRow key={link.id}>
            <TableCell>{link.product_name || "N/A"}</TableCell>
            <TableCell>
              <a
                href={link.url ?? ""}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {link.url}
              </a>
            </TableCell>
            <TableCell>
              {modifications.find((m) => m.id === link.modificationId)?.name ||
                "N/A"}
            </TableCell>
            <TableCell>
              <form action={deleteProduct}>
                <input name="id" type="hidden" value={String(link.id)} />
                <Button variant="destructive" size="sm" type="submit">
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Delete modification</span>
                </Button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
