import { Request, Response } from "express";
import * as memberService from "./member.service";

export const createMembersHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const members =
      await memberService.createMember(
        req.body
      );

    res.status(201).json({
      success: true,
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create members",
    });
  }
};

export const getAllMembersHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const members =
      await memberService.getAllMembers();

    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch members",
    });
  }
};

export const getMemberByIdHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const member =
      await memberService.getMemberById(
        Number(req.params.id)
      );

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Member not found",
    });
  }
};

export const updateMemberHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const member = await memberService.updateMember(
      id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update member",
    });
  }
};


export const deleteMemberHandler = async (
  req: Request,
  res: Response
) => {
  try {
    await memberService.deleteMember(
      Number(req.params.id)
    );

    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    error,
    message: "Failed to create member",
  });
}
  }
