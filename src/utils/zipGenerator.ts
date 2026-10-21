import JSZip from 'jszip';
import { FLASK_PROJECT_FILES } from '../data/flaskProjectFiles';

export async function downloadFlaskProjectZip(): Promise<void> {
  const zip = new JSZip();
  const rootFolder = zip.folder('student_skill_gap_system');

  if (!rootFolder) return;

  for (const file of FLASK_PROJECT_FILES) {
    rootFolder.file(file.path, file.content);
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(content);

  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = 'student_skill_gap_system.zip';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(downloadUrl);
}
