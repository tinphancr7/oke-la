import {TreeMenuItem} from "react-simple-tree-menu";
import classNames from "classnames";
import {useRouter} from "next/router";
import slugify from "slugify";

export const ItemComponent: React.FunctionComponent<TreeMenuItem> = ({
	hasNodes = false,
	isOpen = false,
	level = 0,
	onClick,
	toggleNode,
	active,
	focused,
	key,
	label = "unknown",
	style = {},
	logo = "",
	leagueId,

	menuKey,
}) => {
	const router = useRouter();
	return (
		<div>
			<li
				className={classNames(
					"tree-item",
					{"tree-item--active": active},
					{"tree-item--focused": focused}
				)}
				style={{
					...style,
					fontWeight: level == 0 ? "bold" : "inherit",
					paddingLeft: `${level * 20 + 10}px`,
					paddingTop: "11px",
					paddingBottom: "11px",
					justifyContent: !hasNodes ? "start" : "space-between",
				}}
				role="button"
				aria-pressed={active}
				key={key}
				onClick={(e) => {
					router.push(
						`/xem-giai-dau/${slugify(label, {
							lower: true,
							replacement: "-",
							locale: "vi",
							trim: true,
						})}?leagueId=${leagueId}&tab=${menuKey ? menuKey : 1}`
					);
				}}
			>
				{hasNodes && (
					<div
						className="toggle-icon"
						onClick={(e) => {
							hasNodes && toggleNode && toggleNode();
							e.stopPropagation();
						}}
					>
						{isOpen ? (
							<img src="/icons/CaretUp.svg" />
						) : (
							<img src="/icons/CaretDown.svg" />
						)}
					</div>
				)}
				<div className="flex items-center gap-2">
					{logo ? <img src={logo} width={20} height={20} /> : ""}
					{label}
				</div>
			</li>
		</div>
	);
};

export default ItemComponent;
