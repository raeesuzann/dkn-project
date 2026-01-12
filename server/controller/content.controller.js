import { and, eq, or } from 'drizzle-orm';
import { db } from '../db/index.js';
import { contents } from '../db/schema/content.js';

export const getAllContentList = async (req, res, next) => {
  try {
    const contentList = await db
      .select()
      .from(contents)
      .where(
        and(
          eq(contents.isGDPRChecked, true),
          eq(contents.isNLPCheckPassed, true)
        )
      );

    res.status(200).json({
      data: contentList,
      message: 'All content fetched successfully',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getContentDetailsById = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const addContent = async (req, res, next) => {
  const userId = req.user.userId;
  const authorEmail = req.user.email;
  const newContent = req.body;

  const getRandomNLPCheckPass = () => Math.random() < 0.5;

  try {
    const [addedContent] = await db
      .insert(contents)
      .values({
        ...newContent,
        userId: +userId,
        isNLPCheckPassed: getRandomNLPCheckPass(),
        isGDPRChecked: !newContent.isRegional,
        author: authorEmail,
      })
      .returning();

    res.status(201).json({
      data: addedContent,
      message: 'Content successfully added',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContent = async (req, res, next) => {
  const contentId = req.query.contentId;
  const updatedBody = req.body;
  try {
    const [updatedContent] = db
      .update(contents)
      .set(updatedBody)
      .where(eq(contents.id, +contentId))
      .returning();

    res.status(200).json({
      data: updatedContent,
      message: 'Content successfully updated',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContent = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const getAllAwaitingContents = async (req, res, next) => {
  try {
    const checkAwaitingContentList = await db
      .select()
      .from(contents)
      .where(
        or(
          eq(contents.isGDPRChecked, false),
          eq(contents.isNLPCheckPassed, false)
        )
      );

    res.status(200).json({
      data: checkAwaitingContentList,
      message: 'All check awaiting content fetched successfully',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
