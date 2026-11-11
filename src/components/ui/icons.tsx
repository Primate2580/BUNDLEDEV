import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faArrowRight,
  faBars,
  faBookOpen,
  faBrain,
  faBug,
  faCalendarDays,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faClipboardList,
  faCode,
  faCompass,
  faCopy,
  faDesktop,
  faDownLeftAndUpRightToCenter,
  faEye,
  faEyeSlash,
  faFire,
  faFlag,
  faFlask,
  faFolder,
  faGraduationCap,
  faHammer,
  faLightbulb,
  faListCheck,
  faLock,
  faMagnifyingGlass,
  faMedal,
  faMinus,
  faMobileScreenButton,
  faMoon,
  faPencil,
  faPlay,
  faPlus,
  faRocket,
  faRotateLeft,
  faShoePrints,
  faSliders,
  faSun,
  faTableCells,
  faTableColumns,
  faTabletScreenButton,
  faTrash,
  faTriangleExclamation,
  faTrophy,
  faUpRightAndDownLeftFromCenter,
  faWandMagicSparkles,
  faWandSparkles,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactElement } from "react";

/**
 * Every icon in the app comes through here, so the whole interface uses Font Awesome (the free solid set)
 * and a single place decides how an icon is sized and hidden from screen readers.
 */
export interface IconProps {
  /** width and height in pixels. Default 16. */
  size?: number;
  className?: string;
  /** icons are decorative by default. Pass `false` only for an icon that carries meaning with no text. */
  "aria-hidden"?: boolean | "true" | "false";
  /** accepted so older call sites keep compiling. Font Awesome icons are filled shapes, so it has no effect. */
  strokeWidth?: number;
}

export type IconComponent = (props: IconProps) => ReactElement;

function make(icon: IconDefinition): IconComponent {
  return function FontAwesome({ size = 16, className, "aria-hidden": hidden = true }: IconProps) {
    return <FontAwesomeIcon icon={icon} className={className} style={{ width: size, height: size }} aria-hidden={hidden} />;
  };
}

export const ArrowLeft = make(faArrowLeft);
export const ArrowRight = make(faArrowRight);
export const BookOpen = make(faBookOpen);
export const Brain = make(faBrain);
export const Bug = make(faBug);
export const CalendarDays = make(faCalendarDays);
export const Check = make(faCheck);
export const ChevronDown = make(faChevronDown);
export const ChevronLeft = make(faChevronLeft);
export const ChevronRight = make(faChevronRight);
export const CircleCheck = make(faCircleCheck);
export const CircleX = make(faCircleXmark);
export const ClipboardList = make(faClipboardList);
export const Code2 = make(faCode);
export const Compass = make(faCompass);
export const Copy = make(faCopy);
export const Eye = make(faEye);
export const EyeOff = make(faEyeSlash);
export const Flag = make(faFlag);
export const Flame = make(faFire);
export const FlaskConical = make(faFlask);
export const Folder = make(faFolder);
export const Footprints = make(faShoePrints);
export const GraduationCap = make(faGraduationCap);
export const Hammer = make(faHammer);
export const Info = make(faCircleInfo);
export const LayoutGrid = make(faTableCells);
export const Lightbulb = make(faLightbulb);
export const ListChecks = make(faListCheck);
export const Lock = make(faLock);
export const Maximize2 = make(faUpRightAndDownLeftFromCenter);
export const Medal = make(faMedal);
export const Menu = make(faBars);
export const Minimize2 = make(faDownLeftAndUpRightToCenter);
export const Minus = make(faMinus);
export const Monitor = make(faDesktop);
export const Moon = make(faMoon);
export const PanelLeft = make(faTableColumns);
export const PartyPopper = make(faWandSparkles);
export const Pencil = make(faPencil);
export const Play = make(faPlay);
export const Plus = make(faPlus);
export const Rocket = make(faRocket);
export const RotateCcw = make(faRotateLeft);
export const Search = make(faMagnifyingGlass);
export const SlidersHorizontal = make(faSliders);
export const Smartphone = make(faMobileScreenButton);
export const Sparkles = make(faWandMagicSparkles);
export const Sun = make(faSun);
export const Tablet = make(faTabletScreenButton);
export const Trash2 = make(faTrash);
export const TriangleAlert = make(faTriangleExclamation);
export const Trophy = make(faTrophy);
export const X = make(faXmark);
