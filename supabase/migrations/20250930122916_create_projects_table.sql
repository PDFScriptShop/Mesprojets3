/*
  # Create projects table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key) - Unique identifier for each project
      - `title` (text, required) - Project title
      - `description` (text) - Short project description
      - `objective` (text) - Project objective content (Markdown)
      - `structure` (text) - Expected file/module structure (Markdown)
      - `features` (text) - Features and functionalities (Markdown)
      - `constraints` (text) - Technical constraints and specifications (Markdown)
      - `testing` (text) - Testing mode and instructions (Markdown)
      - `success_criteria` (text) - Success criteria (Markdown)
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `projects` table
    - Add policy for public read access (anyone can view projects)
    - Add policy for public write access (anyone can create/update/delete projects)
    
  Note: For this demo application, we're allowing public access to all operations.
  In a production environment, you would restrict these to authenticated users.
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  objective text DEFAULT '',
  structure text DEFAULT '',
  features text DEFAULT '',
  constraints text DEFAULT '',
  testing text DEFAULT '',
  success_criteria text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert projects"
  ON projects
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update projects"
  ON projects
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete projects"
  ON projects
  FOR DELETE
  USING (true);