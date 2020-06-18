declare module "react-native-read-sms" {
  type Callback = (
    status: "success" | "error",
    sms: string,
    error: string
  ) => void;

  export async function startReadSMS(callback: Callback): void;

  export async function hasSMSPermission(): boolean;

  export async function requestReadSMSPermission(): boolean;

  export function stopReadSMS(): void;
}
