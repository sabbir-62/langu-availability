import { reactive } from "vue";

let timer: ReturnType<typeof setTimeout> | null = null;

const state = reactive({
  show: false,
  message: "",
  type: "success" as "success" | "error" | "info",
});

export function useToast() {
  function showToast(
    message: string,
    type: "success" | "error" | "info" = "success",
    duration: number = 2500,
  ) {
    state.message = message;
    state.type = type;
    state.show = true;

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      state.show = false;
    }, duration);
  }

  return { toast: state, showToast };
}
