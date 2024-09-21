"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Trash, Plus } from "lucide-react";
import { useState } from "react";

interface ProductLink {
  id: number;
  name: string;
  url: string;
}

export default function ProductLinksCard() {
  const [productLinks, setProductLinks] = useState<ProductLink[]>([]);
  const [newProductLink, setNewProductLink] = useState({ name: "", url: "" });

  const handleAddProductLink = () => {
    if (newProductLink.name && newProductLink.url) {
      setProductLinks([...productLinks, { id: Date.now(), ...newProductLink }]);
      setNewProductLink({ name: "", url: "" });
    }
  };

  const handleDeleteProductLink = (id: number) => {
    setProductLinks(productLinks.filter((link) => link.id !== id));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Product Links</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productLinks.map((link) => (
              <TableRow key={link.id}>
                <TableCell>{link.name}</TableCell>
                <TableCell>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {link.url}
                  </a>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteProductLink(link.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex gap-2">
          <Input
            placeholder="Product name"
            value={newProductLink.name}
            onChange={(e) =>
              setNewProductLink({ ...newProductLink, name: e.target.value })
            }
          />
          <Input
            placeholder="URL"
            value={newProductLink.url}
            onChange={(e) =>
              setNewProductLink({ ...newProductLink, url: e.target.value })
            }
          />
          <Button onClick={handleAddProductLink}>
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
