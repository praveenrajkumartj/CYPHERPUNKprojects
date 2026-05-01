import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const article = await prisma.article.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true, email: true, bio: true } } },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    if (!article.published) {
      const session = await getSession();
      if (!session || (session.id !== article.authorId && session.role !== 'ADMIN')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();
    if (!session || (session.role !== 'ADMIN' && session.role !== 'ORGANIZER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const article = await prisma.article.findUnique({ where: { id } });
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    if (article.authorId !== session.id && session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { title, content, excerpt, coverImage, tags, published } = await req.json();

    const wordCount = (content || article.content).split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const updated = await prisma.article.update({
      where: { id },
      data: {
        title: title || article.title,
        content: content || article.content,
        excerpt: excerpt !== undefined ? excerpt : article.excerpt,
        coverImage: coverImage !== undefined ? coverImage : article.coverImage,
        tags: tags || article.tags,
        readTime,
        published: published !== undefined ? published : article.published,
      },
      include: { author: { select: { id: true, name: true, email: true } } },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();
    if (!session || (session.role !== 'ADMIN' && session.role !== 'ORGANIZER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const article = await prisma.article.findUnique({ where: { id } });
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    if (article.authorId !== session.id && session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.article.delete({ where: { id } });

    return NextResponse.json({ message: 'Article deleted' }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
