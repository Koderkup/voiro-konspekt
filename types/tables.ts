export type Notebook = {
  id: number;
  title: string;
  created_at: string;
};

export type Page = {
  id: number;
  notebook_id: number;
  page_number: number;
  title: string;
};

export type Block = {
  id: number;
  page_id: number;
  block_type_id: number;
  position: number;
  content: string;
};
