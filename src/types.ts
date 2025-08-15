export interface MyMeshProps {
  isPaused: boolean;
}

export interface HTMLButtonProps {
  children: React.ReactNode;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
}
