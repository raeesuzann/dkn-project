import { eq, or } from 'drizzle-orm';
import { db } from '../db/index.js';
import { contents } from '../db/schema/content.js';

export const getAllContentList = async (req, res, next) => {
  try {
    const contentList = await db.select().from(contents);

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
  try {
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
