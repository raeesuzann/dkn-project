import { db } from '../db/index.js';
import { policies } from '../db/schema/policy.js';

export const getAllPolicyList = async (req, res, next) => {
  try {
    const policyList = await db.select().from(policies);
    res.status(200).json({
      data: policyList,
      message: 'All policies fetched successfully',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const addPolicy = async (req, res, next) => {
  const newPolicy = req.body;

  try {
    const [addedPloicy] = await db
      .insert(policies)
      .values({
        ...newPolicy,
      })
      .returning();

    res.status(201).json({
      data: addedPloicy,
      message: 'Policy successfully added',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePolicy = async (req, res, next) => {
  const policyId = req.params.id;

  try {
    const [deletedPolicy] = await db
      .delete(policies)
      .where(eq(policies.id, +policyId))
      .returning();

    res.status(200).json({
      data: deletedPolicy,
      message: 'Policy successfully deleted',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
