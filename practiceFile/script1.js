const storageKey = "haru-schedule-items";
const today = new Date();
const localDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const todayString = localDate(today);
const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  weekday: "short",
});
const compactDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
});

const initialItems = [
  { id: "sample-1", title: "주간 팀 미팅", date: todayString, time: "09:30", category: "업무", completed: false },
  { id: "sample-2", title: "기획안 피드백 정리", date: todayString, time: "11:00", category: "업무", completed: false },
  { id: "sample-3", title: "점심 산책하기", date: todayString, time: "12:30", category: "건강", completed: false },
  { id: "sample-4", title: "도서관에서 책 읽기", date: todayString, time: "16:00", category: "개인", completed: false },
];

const elements = {
  list: document.querySelector("#schedule-list"),
  emptyState: document.querySelector("#empty-state"),
  form: document.querySelector("#schedule-form"),
  editDialog: document.querySelector("#edit-dialog"),
  editForm: document.querySelector("#schedule-edit-form"),
  editId: document.querySelector("#edit-task-id"),
  editTitle: document.querySelector("#edit-task-title"),
  editDate: document.querySelector("#edit-task-date"),
  editTime: document.querySelector("#edit-task-time"),
  editCategory: document.querySelector("#edit-task-category"),
  title: document.querySelector("#task-title"),
  date: document.querySelector("#task-date"),
  time: document.querySelector("#task-time"),
  category: document.querySelector("#task-category"),
  total: document.querySelector("#total-count"),
  completed: document.querySelector("#completed-count"),
  rate: document.querySelector("#completion-rate"),
  progress: document.querySelector("#progress-bar"),
  filterAll: document.querySelector("#filter-all-count"),
  navCount: document.querySelector("#nav-count"),
  listSummary: document.querySelector("#list-summary"),
  toast: document.querySelector("#toast"),
};

let items = loadItems();
let activeFilter = "all";
let toastTimer;

function loadItems() {
  try {
    const savedItems = localStorage.getItem(storageKey);
    if (savedItems === null) return initialItems;

    const parsedItems = JSON.parse(savedItems);
    if (!Array.isArray(parsedItems)) {
      throw new Error("저장된 일정 데이터 형식이 올바르지 않습니다.");
    }
    return parsedItems;
  } catch (error) {
    console.error("일정을 불러오지 못했습니다.", error);
    return initialItems;
  }
}

function saveItems() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(items));
  } catch (error) {
    console.error("일정을 저장하지 못했습니다.", error);
    showToast("일정 저장에 실패했어요. 브라우저 저장 공간을 확인해 주세요.");
  }
}

function formatTime(time) {
  const [hourString, minute] = time.split(":");
  const hour = Number(hourString);
  const period = hour < 12 ? "오전" : "오후";
  const displayHour = hour % 12 || 12;
  return `${period} ${displayHour}:${minute}`;
}

function makeElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createScheduleItem(item) {
  const row = makeElement("article", `schedule-item${item.completed ? " is-completed" : ""}`);
  row.dataset.category = item.category;

  const time = makeElement("time", "item-time", formatTime(item.time));
  time.dateTime = item.time;

  const marker = makeElement("span", "item-marker");
  marker.setAttribute("aria-hidden", "true");

  const copy = makeElement("div", "item-copy");
  const title = makeElement("p", "item-title", item.title);
  const meta = makeElement("div", "item-meta");
  const category = makeElement("span", "category-tag", item.category);
  const status = makeElement("span", "item-status", item.completed ? "완료했어요" : "예정된 일정");
  meta.append(category, status);
  copy.append(title, meta);

  const actions = makeElement("div", "item-actions");
  const checkLabel = makeElement("label", "check-control");
  const checkbox = makeElement("input", "check-button");
  checkbox.type = "checkbox";
  checkbox.checked = item.completed;
  checkbox.setAttribute("aria-label", `${item.title} 완료`);
  checkbox.addEventListener("change", () => toggleItem(item.id));
  const checkmark = makeElement("span", "check-mark");
  checkmark.setAttribute("aria-hidden", "true");
  checkLabel.append(checkbox, checkmark);

  const editButton = makeElement("button", "item-action-button");
  editButton.type = "button";
  editButton.setAttribute("aria-label", `${item.title} 수정`);
  editButton.title = "일정 수정";
  editButton.innerHTML = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m12.8 4.2 3 3M3.5 16.5l3.7-.8L16 6.9a2.1 2.1 0 0 0-3-3l-8.8 8.8-.7 3.8Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>';
  editButton.addEventListener("click", () => openEditDialog(item));

  const deleteButton = makeElement("button", "item-action-button delete-action");
  deleteButton.type = "button";
  deleteButton.setAttribute("aria-label", `${item.title} 삭제`);
  deleteButton.title = "일정 삭제";
  deleteButton.innerHTML = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4.5 6h11m-9.5 0 .6 10h7.8l.6-10M8 6V4h4v2m-3 3v4m2-4v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>';
  deleteButton.addEventListener("click", () => deleteItem(item));
  actions.append(checkLabel, editButton, deleteButton);

  row.append(time, marker, copy, actions);
  return row;
}

function filteredItems() {
  const todaysItems = items
    .filter((item) => item.date === todayString)
    .sort((first, second) => first.time.localeCompare(second.time));

  if (activeFilter === "active") return todaysItems.filter((item) => !item.completed);
  if (activeFilter === "completed") return todaysItems.filter((item) => item.completed);
  return todaysItems;
}

function render() {
  const todaysItems = items.filter((item) => item.date === todayString);
  const completedCount = todaysItems.filter((item) => item.completed).length;
  const completionRate = todaysItems.length
    ? Math.round((completedCount / todaysItems.length) * 100)
    : 0;
  const visibleItems = filteredItems();

  elements.total.textContent = String(todaysItems.length);
  elements.completed.textContent = String(completedCount);
  elements.rate.textContent = String(completionRate);
  elements.filterAll.textContent = String(todaysItems.length);
  elements.navCount.textContent = String(todaysItems.length);
  elements.progress.setAttribute("aria-valuenow", String(completionRate));
  elements.progress.querySelector("span").style.width = `${completionRate}%`;
  elements.list.replaceChildren(...visibleItems.map(createScheduleItem));
  elements.emptyState.hidden = visibleItems.length > 0;
  elements.list.hidden = visibleItems.length === 0;
  elements.listSummary.textContent = todaysItems.length
    ? `오늘 ${todaysItems.length}개의 일정이 있어요.`
    : "새로운 계획을 등록해 보세요.";
}

function toggleItem(id) {
  items = items.map((item) => item.id === id ? { ...item, completed: !item.completed } : item);
  saveItems();
  render();
}

function openEditDialog(item) {
  elements.editId.value = item.id;
  elements.editTitle.value = item.title;
  elements.editDate.value = item.date;
  elements.editTime.value = item.time;
  elements.editCategory.value = item.category;
  elements.editDialog.showModal();
  elements.editTitle.focus();
  elements.editTitle.select();
}

function deleteItem(item) {
  if (!window.confirm(`"${item.title}" 일정을 삭제할까요?`)) return;
  items = items.filter((savedItem) => savedItem.id !== item.id);
  saveItems();
  render();
  showToast("일정이 삭제됐어요.");
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("visible"), 2600);
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!elements.form.reportValidity()) return;

  const newItem = {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    title: elements.title.value.trim(),
    date: elements.date.value,
    time: elements.time.value,
    category: elements.category.value,
    completed: false,
  };

  if (!newItem.title) {
    elements.title.focus();
    showToast("일정 제목을 입력해 주세요.");
    return;
  }

  items.push(newItem);
  saveItems();
  render();
  elements.form.reset();
  elements.date.value = todayString;
  elements.time.value = "09:00";
  showToast(newItem.date === todayString ? "오늘의 일정이 추가됐어요." : "일정이 추가됐어요.");
  elements.title.focus();
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("selected", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });
    render();
  });
});

elements.editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!elements.editForm.reportValidity()) return;

  const title = elements.editTitle.value.trim();
  if (!title) {
    elements.editTitle.focus();
    showToast("일정 제목을 입력해 주세요.");
    return;
  }

  const id = elements.editId.value;
  items = items.map((item) => item.id === id
    ? {
      ...item,
      title,
      date: elements.editDate.value,
      time: elements.editTime.value,
      category: elements.editCategory.value,
    }
    : item);
  saveItems();
  elements.editDialog.close();
  render();
  showToast("일정이 수정됐어요.");
});

elements.editDialog.addEventListener("click", (event) => {
  if (event.target === elements.editDialog) elements.editDialog.close();
});

elements.editDialog.querySelectorAll(".dialog-close, .js-close-edit").forEach((button) => {
  button.addEventListener("click", () => elements.editDialog.close());
});

document.querySelector("#today-label").textContent = dateFormatter.format(today);
document.querySelector("#schedule-date").textContent = compactDateFormatter.format(today);
elements.date.value = todayString;
elements.date.min = todayString;
elements.time.value = "09:00";
render();
