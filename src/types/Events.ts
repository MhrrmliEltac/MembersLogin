export interface Event {
  id: string;
  title: string;
  start: string; // ISO 8601 tarixi
  end?: string;
  description?: string;
  location?: string;
  created_at?: string;
}
