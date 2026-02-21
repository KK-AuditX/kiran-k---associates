/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BlogPost {
    id: number;
    date: string;
    title: string;
    summary: string;
    content: string[];
}

/**
 * Parses a markdown file with YAML frontmatter
 * Frontmatter should be between --- delimiters at the start of the file
 * 
 * Example:
 * ---
 * id: 1
 * date: "Oct 12, 2023"
 * title: "My Blog Title"
 * summary: "A brief summary"
 * ---
 * 
 * Blog content here...
 */
export function parseMarkdownBlog(markdown: string): BlogPost {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);
    
    if (!match) {
        throw new Error('Invalid markdown format: missing frontmatter');
    }
    
    const frontmatterStr = match[1];
    const contentStr = match[2].trim();
    
    // Parse YAML-like frontmatter (simple key: value pairs)
    const frontmatter: Record<string, string | number> = {};
    frontmatterStr.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();
            
            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            
            // Try to parse as number
            const numValue = Number(value);
            frontmatter[key] = isNaN(numValue) ? value : numValue;
        }
    });
    
    // Split content into paragraphs (separated by blank lines)
    const content = contentStr
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(p => p.length > 0);
    
    return {
        id: frontmatter.id as number || 0,
        date: frontmatter.date as string || '',
        title: frontmatter.title as string || '',
        summary: frontmatter.summary as string || '',
        content
    };
}

/**
 * Load all blog posts from the imported markdown modules
 * Usage with Vite:
 * 
 * const blogModules = import.meta.glob('./blogs/*.md', { eager: true, query: '?raw', import: 'default' });
 * const blogs = loadAllBlogs(blogModules);
 */
export function loadAllBlogs(modules: Record<string, unknown>): BlogPost[] {
    const blogs: BlogPost[] = [];
    
    for (const path in modules) {
        try {
            const markdown = modules[path] as string;
            const blog = parseMarkdownBlog(markdown);
            blogs.push(blog);
        } catch (error) {
            console.error(`Failed to parse blog at ${path}:`, error);
        }
    }
    
    // Sort by id in ascending order
    return blogs.sort((a, b) => a.id - b.id);
}
