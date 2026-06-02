import { Request, Response } from "express";
import * as borrowRecordService from "./borrowRecord.service";

export const createBorrowRecordHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const record =
        await borrowRecordService.createBorrowRecord(
          req.body
        );

      res.status(201).json({
        success: true,
        data: record,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to create borrow record",
      });
    }
  };

export const getAllBorrowRecordsHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const records =
        await borrowRecordService.getAllBorrowRecords();

      res.status(200).json({
        success: true,
        data: records,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch records",
      });
    }
  };

export const getBorrowRecordByIdHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const record =
        await borrowRecordService.getBorrowRecordById(
          Number(req.params.id)
        );

      res.status(200).json({
        success: true,
        data: record,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Record not found",
      });
    }
  };

export const returnBookHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const record =
        await borrowRecordService.returnBook(
          Number(req.params.id)
        );

      res.status(200).json({
        success: true,
        data: record,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to return book",
      });
    }
  };

export const deleteBorrowRecordHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      await borrowRecordService.deleteBorrowRecord(
        Number(req.params.id)
      );

      res.status(200).json({
        success: true,
        message:
          "Borrow record deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to delete record",
      });
    }
  };