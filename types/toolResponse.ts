export type ContentItem = {
    type: "text";
    text: string;
};
  
export type ToolResponse = {
    content: ContentItem[];
};