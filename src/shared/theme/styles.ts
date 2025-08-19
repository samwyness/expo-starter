import { StyleSheet } from 'react-native';

import { ios, native, platform, web } from '../utils/platform';
import tokens from './tokens.json';

export const atoms = {
  /*
   * Positioning
   */
  fixed: {
    position: platform({
      web: 'fixed',
      native: 'absolute',
    }) as 'absolute',
  },
  absolute: {
    position: 'absolute',
  },
  relative: {
    position: 'relative',
  },
  static: {
    position: 'static',
  },
  sticky: web({
    position: 'sticky',
  }),
  inset_0: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  top_0: {
    top: 0,
  },
  right_0: {
    right: 0,
  },
  bottom_0: {
    bottom: 0,
  },
  left_0: {
    left: 0,
  },
  z_10: {
    zIndex: 10,
  },
  z_20: {
    zIndex: 20,
  },
  z_30: {
    zIndex: 30,
  },
  z_40: {
    zIndex: 40,
  },
  z_50: {
    zIndex: 50,
  },

  overflow_visible: {
    overflow: 'visible',
  },
  overflow_hidden: {
    overflow: 'hidden',
  },
  /**
   * @platform web
   */
  overflow_auto: web({
    overflow: 'auto',
  }),

  /*
   * Width & Height
   */
  w_full: {
    width: '100%',
  },
  h_full: {
    height: '100%',
  },
  h_full_vh: web({
    height: '100vh',
  }),
  max_w_full: {
    maxWidth: '100%',
  },
  max_h_full: {
    maxHeight: '100%',
  },

  /*
   * Theme-independent background colors
   */
  bg_transparent: {
    backgroundColor: 'transparent',
  },

  /*
   * Border radius
   */
  rounded_0: {
    borderRadius: 0,
  },
  rounded_2xs: {
    borderRadius: 2,
  },
  rounded_xs: {
    borderRadius: 4,
  },
  rounded_sm: {
    borderRadius: 8,
  },
  rounded_md: {
    borderRadius: 12,
  },
  rounded_lg: {
    borderRadius: 16,
  },
  rounded_full: {
    borderRadius: 999,
  },

  /*
   * Flex
   */
  gap_0: {
    gap: 0,
  },
  gap_2xs: {
    gap: tokens.spacing._2xs,
  },
  gap_xs: {
    gap: tokens.spacing.xs,
  },
  gap_sm: {
    gap: tokens.spacing.sm,
  },
  gap_md: {
    gap: tokens.spacing.md,
  },
  gap_lg: {
    gap: tokens.spacing.lg,
  },
  gap_xl: {
    gap: tokens.spacing.xl,
  },
  gap_2xl: {
    gap: tokens.spacing._2xl,
  },
  gap_3xl: {
    gap: tokens.spacing._3xl,
  },
  gap_4xl: {
    gap: tokens.spacing._4xl,
  },
  gap_5xl: {
    gap: tokens.spacing._5xl,
  },
  flex: {
    display: 'flex',
  },
  flex_col: {
    flexDirection: 'column',
  },
  flex_row: {
    flexDirection: 'row',
  },
  flex_col_reverse: {
    flexDirection: 'column-reverse',
  },
  flex_row_reverse: {
    flexDirection: 'row-reverse',
  },
  flex_wrap: {
    flexWrap: 'wrap',
  },
  flex_nowrap: {
    flexWrap: 'nowrap',
  },
  flex_0: {
    flex: web('0 0 auto') ?? (native(0) as number),
  },
  flex_1: {
    flex: 1,
  },
  flex_grow: {
    flexGrow: 1,
  },
  flex_grow_0: {
    flexGrow: 0,
  },
  flex_shrink: {
    flexShrink: 1,
  },
  flex_shrink_0: {
    flexShrink: 0,
  },
  justify_start: {
    justifyContent: 'flex-start',
  },
  justify_center: {
    justifyContent: 'center',
  },
  justify_between: {
    justifyContent: 'space-between',
  },
  justify_end: {
    justifyContent: 'flex-end',
  },
  align_center: {
    alignItems: 'center',
  },
  align_start: {
    alignItems: 'flex-start',
  },
  align_end: {
    alignItems: 'flex-end',
  },
  align_baseline: {
    alignItems: 'baseline',
  },
  align_stretch: {
    alignItems: 'stretch',
  },
  self_auto: {
    alignSelf: 'auto',
  },
  self_start: {
    alignSelf: 'flex-start',
  },
  self_end: {
    alignSelf: 'flex-end',
  },
  self_center: {
    alignSelf: 'center',
  },
  self_stretch: {
    alignSelf: 'stretch',
  },
  self_baseline: {
    alignSelf: 'baseline',
  },

  /*
   * Text
   */
  text_left: {
    textAlign: 'left',
  },
  text_center: {
    textAlign: 'center',
  },
  text_right: {
    textAlign: 'right',
  },
  leading_tight: {
    lineHeight: 1.15,
  },
  leading_snug: {
    lineHeight: 1.3,
  },
  leading_normal: {
    lineHeight: 1.5,
  },
  tracking_normal: {
    letterSpacing: 0,
  },
  font_normal: {
    fontWeight: '400',
  },
  font_medium: {
    fontWeight: '500',
  },
  font_bold: {
    fontWeight: '600',
  },
  font_heavy: {
    fontWeight: '800',
  },
  italic: {
    fontStyle: 'italic',
  },

  /*
   * Border
   */
  border_0: {
    borderWidth: 0,
  },
  border_t_0: {
    borderTopWidth: 0,
  },
  border_b_0: {
    borderBottomWidth: 0,
  },
  border_l_0: {
    borderLeftWidth: 0,
  },
  border_r_0: {
    borderRightWidth: 0,
  },
  border: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  border_t: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  border_b: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  border_l: {
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  border_r: {
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  border_transparent: {
    borderColor: 'transparent',
  },
  curve_circular: ios({
    borderCurve: 'circular',
  }),
  curve_continuous: ios({
    borderCurve: 'continuous',
  }),

  /*
   * Shadow
   */
  shadow_sm: {
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 8,
  },
  shadow_md: {
    shadowRadius: 16,
    shadowOpacity: 0.1,
    elevation: 16,
  },
  shadow_lg: {
    shadowRadius: 32,
    shadowOpacity: 0.1,
    elevation: 24,
  },

  /*
   * Padding
   */
  p_0: {
    padding: 0,
  },
  p_2xs: {
    padding: tokens.spacing._2xs,
  },
  p_xs: {
    padding: tokens.spacing.xs,
  },
  p_sm: {
    padding: tokens.spacing.sm,
  },
  p_md: {
    padding: tokens.spacing.md,
  },
  p_lg: {
    padding: tokens.spacing.lg,
  },
  p_xl: {
    padding: tokens.spacing.xl,
  },
  p_2xl: {
    padding: tokens.spacing._2xl,
  },
  p_3xl: {
    padding: tokens.spacing._3xl,
  },
  p_4xl: {
    padding: tokens.spacing._4xl,
  },
  p_5xl: {
    padding: tokens.spacing._5xl,
  },
  px_0: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  px_2xs: {
    paddingLeft: tokens.spacing._2xs,
    paddingRight: tokens.spacing._2xs,
  },
  px_xs: {
    paddingLeft: tokens.spacing.xs,
    paddingRight: tokens.spacing.xs,
  },
  px_sm: {
    paddingLeft: tokens.spacing.sm,
    paddingRight: tokens.spacing.sm,
  },
  px_md: {
    paddingLeft: tokens.spacing.md,
    paddingRight: tokens.spacing.md,
  },
  px_lg: {
    paddingLeft: tokens.spacing.lg,
    paddingRight: tokens.spacing.lg,
  },
  px_xl: {
    paddingLeft: tokens.spacing.xl,
    paddingRight: tokens.spacing.xl,
  },
  px_2xl: {
    paddingLeft: tokens.spacing._2xl,
    paddingRight: tokens.spacing._2xl,
  },
  px_3xl: {
    paddingLeft: tokens.spacing._3xl,
    paddingRight: tokens.spacing._3xl,
  },
  px_4xl: {
    paddingLeft: tokens.spacing._4xl,
    paddingRight: tokens.spacing._4xl,
  },
  px_5xl: {
    paddingLeft: tokens.spacing._5xl,
    paddingRight: tokens.spacing._5xl,
  },
  py_0: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  py_2xs: {
    paddingTop: tokens.spacing._2xs,
    paddingBottom: tokens.spacing._2xs,
  },
  py_xs: {
    paddingTop: tokens.spacing.xs,
    paddingBottom: tokens.spacing.xs,
  },
  py_sm: {
    paddingTop: tokens.spacing.sm,
    paddingBottom: tokens.spacing.sm,
  },
  py_md: {
    paddingTop: tokens.spacing.md,
    paddingBottom: tokens.spacing.md,
  },
  py_lg: {
    paddingTop: tokens.spacing.lg,
    paddingBottom: tokens.spacing.lg,
  },
  py_xl: {
    paddingTop: tokens.spacing.xl,
    paddingBottom: tokens.spacing.xl,
  },
  py_2xl: {
    paddingTop: tokens.spacing._2xl,
    paddingBottom: tokens.spacing._2xl,
  },
  py_3xl: {
    paddingTop: tokens.spacing._3xl,
    paddingBottom: tokens.spacing._3xl,
  },
  py_4xl: {
    paddingTop: tokens.spacing._4xl,
    paddingBottom: tokens.spacing._4xl,
  },
  py_5xl: {
    paddingTop: tokens.spacing._5xl,
    paddingBottom: tokens.spacing._5xl,
  },
  pt_0: {
    paddingTop: 0,
  },
  pt_2xs: {
    paddingTop: tokens.spacing._2xs,
  },
  pt_xs: {
    paddingTop: tokens.spacing.xs,
  },
  pt_sm: {
    paddingTop: tokens.spacing.sm,
  },
  pt_md: {
    paddingTop: tokens.spacing.md,
  },
  pt_lg: {
    paddingTop: tokens.spacing.lg,
  },
  pt_xl: {
    paddingTop: tokens.spacing.xl,
  },
  pt_2xl: {
    paddingTop: tokens.spacing._2xl,
  },
  pt_3xl: {
    paddingTop: tokens.spacing._3xl,
  },
  pt_4xl: {
    paddingTop: tokens.spacing._4xl,
  },
  pt_5xl: {
    paddingTop: tokens.spacing._5xl,
  },
  pb_0: {
    paddingBottom: 0,
  },
  pb_2xs: {
    paddingBottom: tokens.spacing._2xs,
  },
  pb_xs: {
    paddingBottom: tokens.spacing.xs,
  },
  pb_sm: {
    paddingBottom: tokens.spacing.sm,
  },
  pb_md: {
    paddingBottom: tokens.spacing.md,
  },
  pb_lg: {
    paddingBottom: tokens.spacing.lg,
  },
  pb_xl: {
    paddingBottom: tokens.spacing.xl,
  },
  pb_2xl: {
    paddingBottom: tokens.spacing._2xl,
  },
  pb_3xl: {
    paddingBottom: tokens.spacing._3xl,
  },
  pb_4xl: {
    paddingBottom: tokens.spacing._4xl,
  },
  pb_5xl: {
    paddingBottom: tokens.spacing._5xl,
  },
  pl_0: {
    paddingLeft: 0,
  },
  pl_2xs: {
    paddingLeft: tokens.spacing._2xs,
  },
  pl_xs: {
    paddingLeft: tokens.spacing.xs,
  },
  pl_sm: {
    paddingLeft: tokens.spacing.sm,
  },
  pl_md: {
    paddingLeft: tokens.spacing.md,
  },
  pl_lg: {
    paddingLeft: tokens.spacing.lg,
  },
  pl_xl: {
    paddingLeft: tokens.spacing.xl,
  },
  pl_2xl: {
    paddingLeft: tokens.spacing._2xl,
  },
  pl_3xl: {
    paddingLeft: tokens.spacing._3xl,
  },
  pl_4xl: {
    paddingLeft: tokens.spacing._4xl,
  },
  pl_5xl: {
    paddingLeft: tokens.spacing._5xl,
  },
  pr_0: {
    paddingRight: 0,
  },
  pr_2xs: {
    paddingRight: tokens.spacing._2xs,
  },
  pr_xs: {
    paddingRight: tokens.spacing.xs,
  },
  pr_sm: {
    paddingRight: tokens.spacing.sm,
  },
  pr_md: {
    paddingRight: tokens.spacing.md,
  },
  pr_lg: {
    paddingRight: tokens.spacing.lg,
  },
  pr_xl: {
    paddingRight: tokens.spacing.xl,
  },
  pr_2xl: {
    paddingRight: tokens.spacing._2xl,
  },
  pr_3xl: {
    paddingRight: tokens.spacing._3xl,
  },
  pr_4xl: {
    paddingRight: tokens.spacing._4xl,
  },
  pr_5xl: {
    paddingRight: tokens.spacing._5xl,
  },

  /*
   * Margin
   */
  m_0: {
    margin: 0,
  },
  m_2xs: {
    margin: tokens.spacing._2xs,
  },
  m_xs: {
    margin: tokens.spacing.xs,
  },
  m_sm: {
    margin: tokens.spacing.sm,
  },
  m_md: {
    margin: tokens.spacing.md,
  },
  m_lg: {
    margin: tokens.spacing.lg,
  },
  m_xl: {
    margin: tokens.spacing.xl,
  },
  m_2xl: {
    margin: tokens.spacing._2xl,
  },
  m_3xl: {
    margin: tokens.spacing._3xl,
  },
  m_4xl: {
    margin: tokens.spacing._4xl,
  },
  m_5xl: {
    margin: tokens.spacing._5xl,
  },
  m_auto: {
    margin: 'auto',
  },
  mx_0: {
    marginLeft: 0,
    marginRight: 0,
  },
  mx_2xs: {
    marginLeft: tokens.spacing._2xs,
    marginRight: tokens.spacing._2xs,
  },
  mx_xs: {
    marginLeft: tokens.spacing.xs,
    marginRight: tokens.spacing.xs,
  },
  mx_sm: {
    marginLeft: tokens.spacing.sm,
    marginRight: tokens.spacing.sm,
  },
  mx_md: {
    marginLeft: tokens.spacing.md,
    marginRight: tokens.spacing.md,
  },
  mx_lg: {
    marginLeft: tokens.spacing.lg,
    marginRight: tokens.spacing.lg,
  },
  mx_xl: {
    marginLeft: tokens.spacing.xl,
    marginRight: tokens.spacing.xl,
  },
  mx_2xl: {
    marginLeft: tokens.spacing._2xl,
    marginRight: tokens.spacing._2xl,
  },
  mx_3xl: {
    marginLeft: tokens.spacing._3xl,
    marginRight: tokens.spacing._3xl,
  },
  mx_4xl: {
    marginLeft: tokens.spacing._4xl,
    marginRight: tokens.spacing._4xl,
  },
  mx_5xl: {
    marginLeft: tokens.spacing._5xl,
    marginRight: tokens.spacing._5xl,
  },
  mx_auto: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  my_0: {
    marginTop: 0,
    marginBottom: 0,
  },
  my_2xs: {
    marginTop: tokens.spacing._2xs,
    marginBottom: tokens.spacing._2xs,
  },
  my_xs: {
    marginTop: tokens.spacing.xs,
    marginBottom: tokens.spacing.xs,
  },
  my_sm: {
    marginTop: tokens.spacing.sm,
    marginBottom: tokens.spacing.sm,
  },
  my_md: {
    marginTop: tokens.spacing.md,
    marginBottom: tokens.spacing.md,
  },
  my_lg: {
    marginTop: tokens.spacing.lg,
    marginBottom: tokens.spacing.lg,
  },
  my_xl: {
    marginTop: tokens.spacing.xl,
    marginBottom: tokens.spacing.xl,
  },
  my_2xl: {
    marginTop: tokens.spacing._2xl,
    marginBottom: tokens.spacing._2xl,
  },
  my_3xl: {
    marginTop: tokens.spacing._3xl,
    marginBottom: tokens.spacing._3xl,
  },
  my_4xl: {
    marginTop: tokens.spacing._4xl,
    marginBottom: tokens.spacing._4xl,
  },
  my_5xl: {
    marginTop: tokens.spacing._5xl,
    marginBottom: tokens.spacing._5xl,
  },
  my_auto: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  mt_0: {
    marginTop: 0,
  },
  mt_2xs: {
    marginTop: tokens.spacing._2xs,
  },
  mt_xs: {
    marginTop: tokens.spacing.xs,
  },
  mt_sm: {
    marginTop: tokens.spacing.sm,
  },
  mt_md: {
    marginTop: tokens.spacing.md,
  },
  mt_lg: {
    marginTop: tokens.spacing.lg,
  },
  mt_xl: {
    marginTop: tokens.spacing.xl,
  },
  mt_2xl: {
    marginTop: tokens.spacing._2xl,
  },
  mt_3xl: {
    marginTop: tokens.spacing._3xl,
  },
  mt_4xl: {
    marginTop: tokens.spacing._4xl,
  },
  mt_5xl: {
    marginTop: tokens.spacing._5xl,
  },
  mt_auto: {
    marginTop: 'auto',
  },
  mb_0: {
    marginBottom: 0,
  },
  mb_2xs: {
    marginBottom: tokens.spacing._2xs,
  },
  mb_xs: {
    marginBottom: tokens.spacing.xs,
  },
  mb_sm: {
    marginBottom: tokens.spacing.sm,
  },
  mb_md: {
    marginBottom: tokens.spacing.md,
  },
  mb_lg: {
    marginBottom: tokens.spacing.lg,
  },
  mb_xl: {
    marginBottom: tokens.spacing.xl,
  },
  mb_2xl: {
    marginBottom: tokens.spacing._2xl,
  },
  mb_3xl: {
    marginBottom: tokens.spacing._3xl,
  },
  mb_4xl: {
    marginBottom: tokens.spacing._4xl,
  },
  mb_5xl: {
    marginBottom: tokens.spacing._5xl,
  },
  mb_auto: {
    marginBottom: 'auto',
  },
  ml_0: {
    marginLeft: 0,
  },
  ml_2xs: {
    marginLeft: tokens.spacing._2xs,
  },
  ml_xs: {
    marginLeft: tokens.spacing.xs,
  },
  ml_sm: {
    marginLeft: tokens.spacing.sm,
  },
  ml_md: {
    marginLeft: tokens.spacing.md,
  },
  ml_lg: {
    marginLeft: tokens.spacing.lg,
  },
  ml_xl: {
    marginLeft: tokens.spacing.xl,
  },
  ml_2xl: {
    marginLeft: tokens.spacing._2xl,
  },
  ml_3xl: {
    marginLeft: tokens.spacing._3xl,
  },
  ml_4xl: {
    marginLeft: tokens.spacing._4xl,
  },
  ml_5xl: {
    marginLeft: tokens.spacing._5xl,
  },
  ml_auto: {
    marginLeft: 'auto',
  },
  mr_0: {
    marginRight: 0,
  },
  mr_2xs: {
    marginRight: tokens.spacing._2xs,
  },
  mr_xs: {
    marginRight: tokens.spacing.xs,
  },
  mr_sm: {
    marginRight: tokens.spacing.sm,
  },
  mr_md: {
    marginRight: tokens.spacing.md,
  },
  mr_lg: {
    marginRight: tokens.spacing.lg,
  },
  mr_xl: {
    marginRight: tokens.spacing.xl,
  },
  mr_2xl: {
    marginRight: tokens.spacing._2xl,
  },
  mr_3xl: {
    marginRight: tokens.spacing._3xl,
  },
  mr_4xl: {
    marginRight: tokens.spacing._4xl,
  },
  mr_5xl: {
    marginRight: tokens.spacing._5xl,
  },
  mr_auto: {
    marginRight: 'auto',
  },

  /*
   * Pointer events & user select
   */
  pointer_events_none: {
    pointerEvents: 'none',
  },
  pointer_events_auto: {
    pointerEvents: 'auto',
  },
  user_select_none: {
    userSelect: 'none',
  },
  user_select_text: {
    userSelect: 'text',
  },
  user_select_all: {
    userSelect: 'all',
  },
  outline_inset_1: {
    outlineOffset: -1,
  },

  /*
   * Text decoration
   */
  underline: {
    textDecorationLine: 'underline',
  },
  strike_through: {
    textDecorationLine: 'line-through',
  },

  /*
   * Display
   */
  hidden: {
    display: 'none',
  },
  inline: web({
    display: 'inline',
  }),
  block: web({
    display: 'block',
  }),

  pointer: web({
    cursor: 'pointer',
  }),
} as const;

export const s = { ...atoms };
