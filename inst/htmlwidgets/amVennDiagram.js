HTMLWidgets.widget({
  name: "amVennDiagram",

  type: "output",

  factory: function (el, width, height) {
    var inShiny = HTMLWidgets.shinyMode;

    return {
      renderValue: function (x) {
        am5.array.each(am5.registry.rootElements, function (root) {
          if (root.dom.id == el.id) {
            root.dispose();
          }
        });

        // Create root
        var root = am5.Root.new(el.id);

        // Set themes
        switch (x.theme) {
          case "dark":
            root.setThemes([
              am5themes_Animated.new(root),
              am5themes_Dark.new(root)
            ]);
            break;
          case "dataviz":
            root.setThemes([
              am5themes_Animated.new(root),
              am5themes_Dataviz.new(root)
            ]);
            break;
          case "frozen":
            root.setThemes([
              am5themes_Animated.new(root),
              am5themes_Frozen.new(root)
            ]);
            break;
          case "kelly":
            root.setThemes([
              am5themes_Animated.new(root),
              am5themes_Kelly.new(root)
            ]);
            break;
          case "material":
            root.setThemes([
              am5themes_Animated.new(root),
              am5themes_Material.new(root)
            ]);
            break;
          case "moonrise":
            root.setThemes([
              am5themes_Animated.new(root),
              am5themes_Moonrise.new(root)
            ]);
            break;
          case "spirited":
            root.setThemes([
              am5themes_Animated.new(root),
              am5themes_Spirited.new(root)
            ]);
            break;
          default:
            root.setThemes([am5themes_Animated.new(root)]);
        }
        // exporting
        var exporting = am5plugins_exporting.Exporting.new(root, {
          menu: am5plugins_exporting.ExportingMenu.new(root, {}),
          htmlOptions: {
            disabled: true
          },
          pdfOptions: {
            disabled: true
          },
          pdfdataOptions: {
            disabled: true
          },
          csvOptions: {
            disabled: true
          },
          xlsxOptions: {
            disabled: true
          },
          jsonOptions: {
            disabled: true
          }
        });
        // Create wrapper container
        var container = root.container.children.push(
          am5.Container.new(root, {
            width: am5.p100,
            height: am5.p100,
            layout:
              x.legend === "right" ? root.horizontalLayout : root.verticalLayout
          })
        );
        /*        // Set title
        var title = container.children.push(
          am5.Label.new(root, {
            text: x.title,
            fontSize: 20,
            x: am5.percent(50),
            centerX: am5.percent(50)
          })
        ); */
        // Create venn series
        var chart = container.children.push(
          am5venn.Venn.new(root, {
            categoryField: "name",
            valueField: "count",
            intersectionsField: "sets",
            paddingTop: 40,
            paddingBottom: 40,
            paddingLeft: 40,
            paddingRight: 40
          })
        );
        // Set data
        chart.data.setAll(x.data);
        // Labels
        chart.labels.template.setAll({
          fontSize: 20,
          fill: am5.color(0x000000),
          text: "[bold]{category}[/]"
        });
        // Set tooltip content
        chart.slices.template.set(
          "tooltipText",
          "[bold]{category}[/] [bold underline fontStyle: italic]{value}[/]"
        );
        // Set slices settings
        chart.slices.template.setAll({
          fillOpacity: 0.5,
          stroke: am5.color(0x000000),
          strokeWidth: 2
        });
        // Set up hover appearance
        chart.hoverGraphics.setAll({
          strokeDasharray: [3, 3],
          stroke: am5.color(0xffffff),
          strokeWidth: 2
        });
        // Add legend
        var legend = container.children.push(
          am5.Legend.new(root, {
            layout:
              x.legend === "right" ? root.verticalLayout : root.gridLayout,
            centerX: x.legend === "right" ? am5.p100 : am5.p50,
            x: x.legend === "right" ? am5.p100 : am5.p50,
            centerY: x.legend === "right" ? am5.p50 : am5.p100,
            y: x.legend === "right" ? am5.p50 : am5.p100
          })
        );
        legend.data.setAll(chart.dataItems);
        legend.labels.template.setAll({
          fill: am5.color(0x000000)
        });
        legend.valueLabels.template.setAll({
          fill: am5.color(0x000000)
        });

        chart.appear(1000, 100);
      },

      resize: function (width, height) {
        // TODO: code to re-render the widget with a new size
      }
    };
  }
});
