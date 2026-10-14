import { correspondence } from "../helper.js/correspondence-helper";

// Error responses are plain text; for blob (PDF) requests they arrive as a Blob
export const getErrorMessage = async (error, fallback) => {
  const data = error.response?.data;
  if (data instanceof Blob) {
    const text = await data.text();
    return text || fallback;
  }
  return (typeof data === "string" && data) || fallback;
};

const saveBlob = (data, fileName) => {
  const fileURL = window.URL.createObjectURL(new Blob([data], { type: "application/pdf" }));
  const link = document.createElement("a");
  link.href = fileURL;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(fileURL);
};

// Download the notice PDF for a case (generated on the fly)
export const downloadCorrespondencePdf = async (caseNo) => {
  const response = await correspondence.get(`/generatecorr/${caseNo}`, { responseType: "blob" });
  saveBlob(response.data, `Notice_Case_${caseNo}.pdf`);
};

// Queue a pending notice for a case's eligibility result
export const createNotice = (caseNo) => {
  return correspondence.post(`/notices/${caseNo}`).then((response) => response.data);
};

// status: "P" (pending), "C" (completed), or omitted for all
export const getNotices = (status) => {
  return correspondence
    .get("/notices", { params: status ? { status } : {} })
    .then((response) => response.data);
};

// Generate, store and email all pending notices (admin only)
export const processNotices = () => {
  return correspondence.post("/notices/process").then((response) => response.data);
};

// Download the stored PDF of a processed notice
export const downloadNoticePdf = async (noticeId, caseNo) => {
  const response = await correspondence.get(`/notices/${noticeId}/pdf`, { responseType: "blob" });
  saveBlob(response.data, `Notice_Case_${caseNo ?? noticeId}.pdf`);
};
