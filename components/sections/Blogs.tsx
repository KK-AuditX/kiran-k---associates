import Link from 'next/link';
import { client, blogListQuery } from '@/lib/sanity';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import { ArrowRightIcon } from '@/components/ui/Icons';

// Fallback blogs (used until Sanity is connected)
const FALLBACK_BLOGS = [
  {
    _id: '1',
    slug: { current: 'ai-forensic-audits' },
    title: 'The Role of AI in Modern Forensic Audits',
    summary: 'How machine learning algorithms are detecting anomalies in financial data faster than ever before.',
    publishedAt: '2023-10-12',
    tags: ['AI', 'Forensic'],
  },
  {
    _id: '2',
    slug: { current: 'gst-saas-companies' },
    title: 'GST Compliance for SaaS Companies',
    summary: 'Navigating the complexities of cross-border taxation and digital service levies in India.',
    publishedAt: '2023-09-28',
    tags: ['GST', 'SaaS'],
  },
  {
    _id: '3',
    slug: { current: 'cybersecurity-balance-sheet' },
    title: 'Cybersecurity: The New Balance Sheet Risk',
    summary: 'Why CFOs must prioritise information security and how to quantify cyber risk financially.',
    publishedAt: '2023-08-15',
    tags: ['Cybersecurity', 'CFO'],
  },
];

async function getBlogs(): Promise<BlogPost[]> {
  try {
    const data = await client.fetch<BlogPost[]>(blogListQuery, {}, { next: { revalidate: 900 } });
    return data?.length ? data : (FALLBACK_BLOGS as unknown as BlogPost[]);
  } catch {
    return FALLBACK_BLOGS as unknown as BlogPost[];
  }
}

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <section id="blogs" className="bg-[#060d1a] py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            eyebrow="Insights"
            title="Thought Leadership"
            description="Perspectives on where finance, technology, and compliance intersect."
          />
        </FadeIn>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, i) => (
            <FadeIn key={blog._id} delay={i * 0.08}>
              <Link href={`/blog/${blog.slug.current}`} className="block h-full">
                <Card hover className="flex h-full flex-col p-7">
                  {blog.tags?.length ? (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="subtle">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : null}

                  <p className="mb-3 text-xs font-medium text-teal-500">
                    {formatDate(blog.publishedAt)}
                  </p>
                  <h3 className="mb-3 text-lg font-bold leading-snug text-text-primary line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
                    {blog.summary}
                  </p>
                  <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-teal-500 hover:text-teal-400 transition-colors">
                    Read Insight <ArrowRightIcon size={16} />
                  </div>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
