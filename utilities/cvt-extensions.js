if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}
HTMLHelper ={};
	module.exports = function()
	{
		HTMLHelper = {
			ToTable: function(rows,tableclass,rowclass,dataclass){
				var html = '<table class="{0}">'.format(tableclass);
				rows.forEach(function(row){
					html +='<tr class="{0}">'.format(rowclass);
					for(var field in row){
						html += '<td class="{1}">{0}</td>'.format(row[field],dataclass);
					}
					html+='</tr>';

				});
				html += '</table>';
				return html;
			}
		}



}
