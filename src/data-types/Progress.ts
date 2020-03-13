export type ProgressMessage = string | null;

export enum ProgressStatus {
  NIL,
  REQUEST,
  SUCCESS,
  ERROR,
}

export interface Progress {
  message: ProgressMessage;
  status: ProgressStatus;
}

/** Creates a progress object representing default (nil) state. */
export const nilProgress = (): Progress => ({
  message: null,
  status: ProgressStatus.NIL,
});
