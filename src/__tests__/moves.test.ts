import {
  getMoves,
  getMovesQueen,
  getMovesBishop,
  getMovesKing,
  getMovesKnight,
  getMovesPawn,
  getMovesRook,
} from '../moves';
import { emptyBoard, emptySquare, initializeBoard, initializePiece, setSquare } from '../index';
import { Color, PieceSubType, PieceType } from '../types';

const board = initializeBoard(true);

const pieceWhiteBishop = initializePiece(Color.White, PieceType.Bishop, PieceSubType.West);
const pieceWhiteKing = initializePiece(Color.White, PieceType.King);
const pieceWhiteKnight = initializePiece(Color.White, PieceType.Knight, PieceSubType.West);
const pieceWhitePawn = initializePiece(Color.White);
const pieceWhiteQueen = initializePiece(Color.White, PieceType.Queen);
const pieceWhiteRook = initializePiece(Color.White, PieceType.Rook, PieceSubType.West);

const pieceBlackBishop = initializePiece(Color.Black, PieceType.Bishop, PieceSubType.West);
const pieceBlackKing = initializePiece(Color.Black, PieceType.King);
const pieceBlackKnight = initializePiece(Color.Black, PieceType.Knight, PieceSubType.West);
const pieceBlackPawn = initializePiece(Color.Black);
const pieceBlackQueen = initializePiece(Color.Black, PieceType.Queen);

const expectedMovesBishop1 = [
  { file: 'c', rank: 5 },
  { file: 'b', rank: 6 },
  { file: 'a', rank: 7 },
  { file: 'e', rank: 5 },
  { file: 'f', rank: 6 },
  { file: 'g', rank: 7 },
  { file: 'h', rank: 8 },
  { file: 'e', rank: 3 },
  { file: 'f', rank: 2 },
  { file: 'g', rank: 1 },
  { file: 'c', rank: 3 },
  { file: 'b', rank: 2 },
  { file: 'a', rank: 1 },
];

const expectedMovesRook = [
  { file: 'd', rank: 5 },
  { file: 'd', rank: 6 },
  { file: 'd', rank: 7 },
  { file: 'd', rank: 8 },
  { file: 'e', rank: 4 },
  { file: 'f', rank: 4 },
  { file: 'g', rank: 4 },
  { file: 'h', rank: 4 },
  { file: 'd', rank: 3 },
  { file: 'd', rank: 2 },
  { file: 'd', rank: 1 },
  { file: 'c', rank: 4 },
  { file: 'b', rank: 4 },
  { file: 'a', rank: 4 },
];

test('getMovesKing', () => {
  setSquare(board, 'e4', pieceWhiteKing);

  const expectedMovesKing1 = [
    { file: 'd', rank: 3 },
    { file: 'e', rank: 3 },
    { file: 'f', rank: 3 },
    { file: 'd', rank: 4 },
    { file: 'f', rank: 4 },
    { file: 'd', rank: 5 },
    { file: 'e', rank: 5 },
    { file: 'f', rank: 5 },
  ];

  expect(getMoves(board, 'e4')).toStrictEqual(expectedMovesKing1);
  expect(getMovesKing(board, 'e4', Color.White)).toStrictEqual(expectedMovesKing1);

  emptySquare(board, 'e4');
  setSquare(board, 'h8', pieceWhiteKing);

  const expectedMovesKing2 = [
    { file: 'g', rank: 7 },
    { file: 'h', rank: 7 },
    { file: 'g', rank: 8 },
  ];

  expect(getMoves(board, 'h8')).toStrictEqual(expectedMovesKing2);
  expect(getMovesKing(board, 'h8', Color.White)).toStrictEqual(expectedMovesKing2);

  setSquare(board, 'g7', pieceBlackQueen);
  setSquare(board, 'g8', pieceBlackKing);
  setSquare(board, 'h7', pieceWhitePawn);

  const expectedMovesKing3 = [{ file: 'g', rank: 7 }];

  expect(getMoves(board, 'h8')).toStrictEqual(expectedMovesKing3);
  expect(getMovesKing(board, 'h8', Color.White)).toStrictEqual(expectedMovesKing3);
});

test('getMovesBishop', () => {
  emptyBoard(board);
  setSquare(board, 'd4', pieceWhiteBishop);

  expect(getMoves(board, 'd4')).toStrictEqual(expectedMovesBishop1);
  expect(getMovesBishop(board, 'd4', Color.White)).toStrictEqual(expectedMovesBishop1);

  setSquare(board, 'e5', pieceWhitePawn);
  setSquare(board, 'e3', pieceBlackQueen);
  setSquare(board, 'b2', pieceBlackKing);

  const expectedMovesBishop2 = [
    { file: 'c', rank: 5 },
    { file: 'b', rank: 6 },
    { file: 'a', rank: 7 },
    { file: 'e', rank: 3 },
    { file: 'c', rank: 3 },
  ];

  expect(getMoves(board, 'd4')).toStrictEqual(expectedMovesBishop2);
  expect(getMovesBishop(board, 'd4', Color.White)).toStrictEqual(expectedMovesBishop2);
});

test('getMovesRook', () => {
  emptyBoard(board);
  setSquare(board, 'd4', pieceWhiteRook);

  expect(getMoves(board, 'd4')).toStrictEqual(expectedMovesRook);
  expect(getMovesRook(board, 'd4', Color.White)).toStrictEqual(expectedMovesRook);
});

test('getMovesQueen', () => {
  emptyBoard(board);
  setSquare(board, 'd4', pieceWhiteQueen);

  const expectedMovesQueen = [...expectedMovesBishop1, ...expectedMovesRook];

  expect(getMoves(board, 'd4')).toStrictEqual(expectedMovesQueen);
  expect(getMovesQueen(board, 'd4', Color.White)).toStrictEqual(expectedMovesQueen);
});

test('getMovesKnight', () => {
  emptyBoard(board);
  setSquare(board, 'd4', pieceWhiteKnight);

  const expectedMovesKnight = [
    { file: 'b', rank: 5 },
    { file: 'c', rank: 6 },
    { file: 'e', rank: 6 },
    { file: 'f', rank: 5 },
    { file: 'b', rank: 3 },
    { file: 'c', rank: 2 },
    { file: 'e', rank: 2 },
    { file: 'f', rank: 3 },
  ];

  expect(getMoves(board, 'd4')).toStrictEqual(expectedMovesKnight);
  expect(getMovesKnight(board, 'd4', Color.White)).toStrictEqual(expectedMovesKnight);

  setSquare(board, 'b5', pieceBlackQueen);
  setSquare(board, 'c6', pieceBlackKing);
  setSquare(board, 'e6', pieceWhiteBishop);
  setSquare(board, 'f5', pieceWhiteKing);

  const expectedMovesKnight1 = [
    { file: 'b', rank: 5 },
    { file: 'b', rank: 3 },
    { file: 'c', rank: 2 },
    { file: 'e', rank: 2 },
    { file: 'f', rank: 3 },
  ];

  expect(getMoves(board, 'd4')).toStrictEqual(expectedMovesKnight1);
  expect(getMovesKnight(board, 'd4', Color.White)).toStrictEqual(expectedMovesKnight1);

  emptyBoard(board);
  setSquare(board, 'b1', pieceWhiteKnight);
  setSquare(board, 'd2', pieceWhiteRook);
  setSquare(board, 'b2', pieceWhiteBishop);

  const expectedMovesKnight2 = [
    { file: 'a', rank: 3 },
    { file: 'c', rank: 3 },
  ];

  expect(getMoves(board, 'b1')).toStrictEqual(expectedMovesKnight2);
  expect(getMovesKnight(board, 'b1', Color.White)).toStrictEqual(expectedMovesKnight2);
});

test('getMovesPawn', () => {
  // Initial rank
  emptyBoard(board);
  setSquare(board, 'd2', pieceWhitePawn);

  const expectedMovesPawn1 = [
    { file: 'd', rank: 3 },
    { file: 'd', rank: 4 },
  ];

  expect(getMoves(board, 'd2')).toStrictEqual(expectedMovesPawn1);
  expect(getMovesPawn(board, 'd2', Color.White)).toStrictEqual(expectedMovesPawn1);

  setSquare(board, 'c3', pieceBlackBishop);
  setSquare(board, 'e3', pieceBlackKnight);

  const expectedMovesPawn2 = [
    { file: 'd', rank: 3 },
    { file: 'c', rank: 3 },
    { file: 'e', rank: 3 },
    { file: 'd', rank: 4 },
  ];

  expect(getMoves(board, 'd2')).toStrictEqual(expectedMovesPawn2);
  expect(getMovesPawn(board, 'd2', Color.White)).toStrictEqual(expectedMovesPawn2);

  setSquare(board, 'd4', pieceBlackQueen);

  const expectedMovesPawn3 = [
    { file: 'd', rank: 3 },
    { file: 'c', rank: 3 },
    { file: 'e', rank: 3 },
  ];

  expect(getMoves(board, 'd2')).toStrictEqual(expectedMovesPawn3);
  expect(getMovesPawn(board, 'd2', Color.White)).toStrictEqual(expectedMovesPawn3);

  setSquare(board, 'd4', pieceWhiteBishop);

  expect(getMoves(board, 'd2')).toStrictEqual(expectedMovesPawn3);
  expect(getMovesPawn(board, 'd2', Color.White)).toStrictEqual(expectedMovesPawn3);

  setSquare(board, 'd3', pieceBlackPawn);

  const expectedMovesPawn4 = [
    { file: 'c', rank: 3 },
    { file: 'e', rank: 3 },
  ];

  expect(getMoves(board, 'd2')).toStrictEqual(expectedMovesPawn4);
  expect(getMovesPawn(board, 'd2', Color.White)).toStrictEqual(expectedMovesPawn4);

  emptySquare(board, 'd4');

  expect(getMoves(board, 'd2')).toStrictEqual(expectedMovesPawn4);
  expect(getMovesPawn(board, 'd2', Color.White)).toStrictEqual(expectedMovesPawn4);

  setSquare(board, 'c3', pieceWhiteBishop);

  const expectedMovesPawn5 = [{ file: 'e', rank: 3 }];

  expect(getMoves(board, 'd2')).toStrictEqual(expectedMovesPawn5);
  expect(getMovesPawn(board, 'd2', Color.White)).toStrictEqual(expectedMovesPawn5);

  setSquare(board, 'e3', pieceWhiteKnight);

  expect(getMoves(board, 'd2')).toStrictEqual([]);
  expect(getMovesPawn(board, 'd2', Color.White)).toStrictEqual([]);

  // Non-initial rank
  emptyBoard(board);
  setSquare(board, 'd3', pieceWhitePawn);

  const expectedMovesPawn6 = [{ file: 'd', rank: 4 }];

  expect(getMoves(board, 'd3')).toStrictEqual(expectedMovesPawn6);
  expect(getMovesPawn(board, 'd3', Color.White)).toStrictEqual(expectedMovesPawn6);

  setSquare(board, 'c4', pieceBlackBishop);
  setSquare(board, 'e4', pieceBlackKnight);

  const expectedMovesPawn7 = [
    { file: 'd', rank: 4 },
    { file: 'c', rank: 4 },
    { file: 'e', rank: 4 },
  ];

  expect(getMoves(board, 'd3')).toStrictEqual(expectedMovesPawn7);
  expect(getMovesPawn(board, 'd3', Color.White)).toStrictEqual(expectedMovesPawn7);

  setSquare(board, 'd5', pieceBlackQueen);

  expect(getMoves(board, 'd3')).toStrictEqual(expectedMovesPawn7);
  expect(getMovesPawn(board, 'd3', Color.White)).toStrictEqual(expectedMovesPawn7);

  setSquare(board, 'd5', pieceWhiteBishop);

  expect(getMoves(board, 'd3')).toStrictEqual(expectedMovesPawn7);
  expect(getMovesPawn(board, 'd3', Color.White)).toStrictEqual(expectedMovesPawn7);

  setSquare(board, 'd4', pieceBlackPawn);

  const expectedMovesPawn8 = [
    { file: 'c', rank: 4 },
    { file: 'e', rank: 4 },
  ];

  expect(getMoves(board, 'd3')).toStrictEqual(expectedMovesPawn8);
  expect(getMovesPawn(board, 'd3', Color.White)).toStrictEqual(expectedMovesPawn8);

  emptySquare(board, 'd5');

  expect(getMoves(board, 'd3')).toStrictEqual(expectedMovesPawn8);
  expect(getMovesPawn(board, 'd3', Color.White)).toStrictEqual(expectedMovesPawn8);

  setSquare(board, 'c4', pieceWhiteBishop);

  const expectedMovesPawn9 = [{ file: 'e', rank: 4 }];

  expect(getMoves(board, 'd3')).toStrictEqual(expectedMovesPawn9);
  expect(getMovesPawn(board, 'd3', Color.White)).toStrictEqual(expectedMovesPawn9);

  setSquare(board, 'e4', pieceWhiteKnight);

  expect(getMoves(board, 'd3')).toStrictEqual([]);
  expect(getMovesPawn(board, 'd3', Color.White)).toStrictEqual([]);
});
