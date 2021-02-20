import { Board, Cell, Color, Piece, PieceSubType, PieceType } from './types';
import { DEFAULT_ASCII_LOWERCASE_A, DEFAULT_FILE_COUNT, DEFAULT_RANK_COUNT } from './constants';

export const getPiecePoints = (piece: PieceType) => {
  const { Bishop, King, Knight, Pawn, Queen, Rook } = PieceType;

  switch (piece) {
    case Pawn:
      return 1;

    case Bishop:
    case Knight:
      return 3;

    case Rook:
      return 5;

    case Queen:
      return 9;

    case King:
    default:
      return 0;
  }
};

export const getFileLetter = (fileNumber: number) => {
  if (fileNumber >= 1) {
    const fileLetter = String.fromCharCode(fileNumber - 1 + DEFAULT_ASCII_LOWERCASE_A);
    return fileLetter;
  }

  return '';
};

export const initializePiece = (color: Color, type = PieceType.Pawn, subType?: PieceSubType) => {
  const piece: Piece = {
    color,
    hasNeverMoved: true,
    isFromPromotion: false,
    subType,
    type,
  };

  return piece;
};

export const getFileBasedPieceType = (file: number, fileCount = DEFAULT_FILE_COUNT) => {
  const { Bishop, King, Knight, Queen, Rook } = PieceType;

  if ([1, fileCount].includes(file)) return Rook;
  if ([2, fileCount - 1].includes(file)) return Knight;
  if ([3, fileCount - 2].includes(file)) return Bishop;
  if (file === 4) return Queen;
  if (file === fileCount - 3) return King;

  return undefined;
};

export const getFileBasedPieceSubType = (file: number, fileCount = DEFAULT_FILE_COUNT) => {
  const { West, East } = PieceSubType;

  if (file <= 3) return West;
  if (file > fileCount - 3) return East;

  return undefined;
};

export const initializeBoard = (fileCount = DEFAULT_FILE_COUNT, rankCount = DEFAULT_RANK_COUNT) => {
  const board: Board = { cells: [] };

  for (let file = 1; file <= fileCount; file++) {
    for (let rank = 1; rank <= rankCount; rank++) {
      const cell: Cell = { file: getFileLetter(file), rank };

      if ([1, rankCount].includes(rank)) {
        const color = rank === 1 ? Color.White : Color.Black;
        const pieceType = getFileBasedPieceType(file);
        const pieceSubType = getFileBasedPieceSubType(file);
        cell.piece = initializePiece(color, pieceType, pieceSubType);
      }

      if ([2, rankCount - 1].includes(rank)) {
        const color = rank === 2 ? Color.White : Color.Black;
        cell.piece = initializePiece(color);
      }

      board.cells.push(cell);
    }
  }

  return board;
};

export { PieceType };
